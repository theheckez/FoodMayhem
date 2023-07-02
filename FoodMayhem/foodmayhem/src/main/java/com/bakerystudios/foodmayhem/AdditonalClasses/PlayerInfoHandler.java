package com.bakerystudios.foodmayhem.AdditonalClasses;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class PlayerInfoHandler extends TextWebSocketHandler{
     public Map<String, WebSocketSession> currentUsers = new ConcurrentHashMap<>();

     @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception 
    {
        if(currentUsers.size() < 2)
        {
            currentUsers.put(session.getId(), session);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception 
    {
		currentUsers.remove(session.getId());
	}

    @Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception 
    {
        for(WebSocketSession currentUser : currentUsers.values())
        {
            if(!currentUser.getId().equals(session.getId()))
            {
                String msg = message.getPayload();
                currentUser.sendMessage(new TextMessage(msg));
            }
        }
	}
}
