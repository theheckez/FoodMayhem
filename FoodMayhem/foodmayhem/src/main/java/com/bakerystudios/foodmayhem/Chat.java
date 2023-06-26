package com.bakerystudios.foodmayhem;

public class Chat {
    
  
    private Integer id;

 
    private String nickname;

    
    private String message;

    //Date date;

    public Integer getId() {
        return id;
    } 

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNick() {
        return nickname;
    }
    public void setNick(String nick) {
        this.nickname = nick;
    }

    public String getMessage() {
        return message;
    }
    public void setMessage(String msg) {
        this.message = msg;
    }
}
