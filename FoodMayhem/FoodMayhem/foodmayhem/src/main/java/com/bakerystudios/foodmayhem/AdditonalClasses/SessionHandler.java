package com.bakerystudios.foodmayhem.AdditonalClasses;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;

import org.json.simple.JSONObject;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

public class SessionHandler extends TextWebSocketHandler 
{
    
    public Map<String, WebSocketSession> currentUsers = new ConcurrentHashMap<>();
    public String user1Id = null;
    public String user2Id = null;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception 
    {
        if(currentUsers.size() < 2)
        {
            currentUsers.put(session.getId(), session);
            if(user1Id == null) 
            {
                user1Id = session.getId();
                JSONObject json = new JSONObject();
				json.put("player", 1);
				json.put("type", "playerID");
				session.sendMessage(new TextMessage(json.toJSONString()));
            }
            else if(user2Id == null)
            {
                user2Id = session.getId();
                JSONObject json = new JSONObject();
				json.put("player", 2);
				json.put("type", "playerID");
				session.sendMessage(new TextMessage(json.toJSONString()));	
            }
            if(currentUsers.size() == 2)
            {
                for(WebSocketSession currentUser : currentUsers.values())
                {
                    JSONObject json = new JSONObject();
					json.put("player", 0);
					json.put("type", "playerID");
					currentUser.sendMessage(new TextMessage(json.toJSONString()));
                }
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		if(session.getId() == user1Id)
		{
			user1Id = null;
		}
		if(session.getId() == user2Id)
		{
			
			user2Id = null;
		}
		currentUsers.remove(session.getId());

		for(WebSocketSession user : currentUsers.values()) {
			JSONObject json = new JSONObject();
			json.put("type", "playerGone");
			user.sendMessage(new TextMessage(json.toJSONString()));
		}
	}

    @Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		ObjectMapper mapper = new ObjectMapper();
		JsonNode node = mapper.readTree(message.getPayload());
		
		if(node.get("type").asText().equals("play"))
		{
			for(WebSocketSession user : currentUsers.values()) {
				JSONObject json = new JSONObject();
				json.put("type", "play");
				user.sendMessage(new TextMessage(json.toJSONString()));
			}
		}
		if(node.get("type").asText().equals("gameOver"))
		{
			for(WebSocketSession user : currentUsers.values()) {
				JSONObject json = new JSONObject();
				json.put("type", "gameOver");
				user.sendMessage(new TextMessage(json.toJSONString()));
			}
		}
	}
}

