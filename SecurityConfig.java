package com.cts.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod; // Make sure this is imported
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .cors(customizer -> customizer.disable())
                .csrf(customizer -> customizer.disable())
                .authorizeHttpRequests(request -> request
                        // --- KEEP THESE RULES ---
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html","/events", "/events/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/uploads/**").permitAll()
                        // ------------------------

                        // --- All your other rules ---
                        .requestMatchers(HttpMethod.POST, "/organizer/organizerProfile").hasAuthority("EVENT_ORGANIZER")
                        .requestMatchers(HttpMethod.GET, "/events/organizer/**").hasAnyAuthority("EVENT_ORGANIZER", "ADMIN")
                        .requestMatchers(HttpMethod.GET, "/events/ongoing").hasAuthority("ADMIN") 
                        .requestMatchers(HttpMethod.GET, "/events", "/events/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/organizer/organizerProfile/**").hasAuthority("EVENT_ORGANIZER")
                        .requestMatchers(HttpMethod.GET, "/organizer").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/organizer/**").hasAnyAuthority("ADMIN", "EVENT_ORGANIZER")
                        .requestMatchers(HttpMethod.POST, "/events/create/**").hasAuthority("EVENT_ORGANIZER")
                        .requestMatchers(HttpMethod.PUT, "/events/**").hasAuthority("EVENT_ORGANIZER")
                        .requestMatchers(HttpMethod.DELETE, "/events/**").hasAnyAuthority("EVENT_ORGANIZER", "ADMIN")
                        .requestMatchers("/bookings/customer/**").hasAuthority("CUSTOMER")
                        .requestMatchers("/bookings/organizer/**").hasAuthority("EVENT_ORGANIZER")
                        .requestMatchers(HttpMethod.DELETE, "/bookings/**").hasAnyAuthority("CUSTOMER", "ADMIN")
                        .requestMatchers("/feedbacks/**").authenticated()
                        .requestMatchers(HttpMethod.GET, "/event-images/event/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/event-images/upload").hasAuthority("EVENT_ORGANIZER")
                        .requestMatchers(HttpMethod.POST, "/event-images").hasAuthority("EVENT_ORGANIZER")
                        .requestMatchers(HttpMethod.DELETE, "/event-images/**").hasAuthority("EVENT_ORGANIZER")

                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        final CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(Collections.singletonList("*"));
//        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
//        configuration.setAllowedHeaders(Collections.singletonList("*"));
//        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }
}