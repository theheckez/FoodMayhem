package com.bakerystudios.foodmayhem;

public class User {
    private String nick;
	private int highscore;
	private String password;
	
	
	public User() {}
	
	public User(String _nick, String _password) 
	{
		this.nick = _nick;
		this.highscore = 0;
	    this.password = _password;
	}
	
	public void setNick(String _nick) 
	{
		this.nick = _nick;
	}
	
	public String getNick()
	{
        return this.nick;
	}
	
	public void setHighscore(int _highscore) 
	{
        this.highscore = _highscore;
    }
	    
    public int getHighscore(){
        return this.highscore;
    }
	    
    public void getPassword(String _password) {
        this.password = _password;
    }
    
    public String getPassword(){
        return this.password;
    }
}
