package com.cts.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        
        // --- THIS IS THE FINAL FIX ---
        // 1. Find the ABSOLUTE path printed in your Spring Boot console on startup.
        //    (It looks like "Upload directory created at: C:\...")
        //
        // 2. Copy that path here, replace backslashes "\" with forward slashes "/",
        //    add "file:///" to the beginning, and a "/" to the end.
        
        // !! DOUBLE-CHECK THIS PATH !!
        String myAbsoluteUploadPath = "file:///C:/G3-Project-be/EMS-be/eventorganizer-app/uploads";
        

        registry.addResourceHandler("/uploads/**")
              .addResourceLocations(myAbsoluteUploadPath);
    }
}