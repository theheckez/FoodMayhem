package com.bakerystudios.foodmayhem;

import java.util.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bakerystudios.foodmayhem.Chat;

@RestController
@RequestMapping("/chats")
public class ChatController {
    
    private List<Chat> chats = new ArrayList<>();

    @GetMapping
    public List<Chat> findChats(){
        return chats;
    }

    @PostMapping
    public ResponseEntity<Chat> addItem(@RequestBody Chat s) {
		Chat c = new Chat();
        c.setNick(s.getNick());
        c.setMessage(s.getMessage());
        chats.add(c);
		return new ResponseEntity<>(c,HttpStatus.CREATED);
	}
}
