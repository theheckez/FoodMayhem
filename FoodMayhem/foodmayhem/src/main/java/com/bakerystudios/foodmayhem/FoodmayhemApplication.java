package com.bakerystudios.foodmayhem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.*;
import org.springframework.context.annotation.Bean;

import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.bakerystudios.foodmayhem.AdditonalClasses.ChatHandler;
import com.bakerystudios.foodmayhem.AdditonalClasses.SessionHandler;
import com.bakerystudios.foodmayhem.AdditonalClasses.MovementHandler;
import com.bakerystudios.foodmayhem.AdditonalClasses.PlayerInfoHandler;
import com.bakerystudios.foodmayhem.AdditonalClasses.SceneChangeHandler;
import com.bakerystudios.foodmayhem.AdditonalClasses.GenerationHandler;
import com.bakerystudios.foodmayhem.AdditonalClasses.EnemyMovementHandler;

@SpringBootApplication
@EnableWebSocket
public class FoodmayhemApplication implements WebSocketConfigurer 
{
	public static void main(String[] args) {
		SpringApplication.run(FoodmayhemApplication.class, args);
	}

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry)
	{
		registry.addHandler(ChatHandler(), "/chat").setAllowedOrigins("*");
		registry.addHandler(SessionsHandler(), "/sessions").setAllowedOrigins("*");
		registry.addHandler(MovementHandler(),"/movement").setAllowedOrigins("*");
		registry.addHandler(GenerationHandler(),"/randomGeneration").setAllowedOrigins("*");
		registry.addHandler(EnemyMovementHandler(), "/enemyMovement").setAllowedOrigins("*");
		registry.addHandler(PlayerInfoHandler(), "/playerInfo").setAllowedOrigins("*");
		registry.addHandler(SceneChangeHandler(), "/sceneChange").setAllowedOrigins("*");
	}

	@Bean
	public ChatHandler ChatHandler()
	{
		return new ChatHandler();
	}

	@Bean
	public SessionHandler SessionsHandler()
	{
		return new SessionHandler();
	}

	@Bean
	public MovementHandler MovementHandler()
	{
		return new MovementHandler();
	}

	@Bean
	public GenerationHandler GenerationHandler()
	{
		return new GenerationHandler();
	}
	
	@Bean
	public EnemyMovementHandler EnemyMovementHandler()
	{
		return new EnemyMovementHandler();
	}

	@Bean
	public PlayerInfoHandler PlayerInfoHandler()
	{
		return new PlayerInfoHandler();
	}

	@Bean
	public SceneChangeHandler SceneChangeHandler()
	{
		return new SceneChangeHandler();
	}
}


