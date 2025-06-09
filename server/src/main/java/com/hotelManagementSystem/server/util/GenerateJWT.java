package com.hotelManagementSystem.server.util;

import org.springframework.beans.factory.annotation.Value;

import java.security.Key;
import java.util.Date;
import java.util.Map;

public class GenerateJWT {

    private final Key key;

    @Value("${jwt.expiration")
    private long jwtExpirationMs;

    public JwtService(@Value("${jwt.secret:}") String configuredSecret) {
        // If the configured secret is long enough, use it
        if (configuredSecret != null && !configuredSecret.isEmpty() && configuredSecret.getBytes().length >= 32) {
            this.key = Keys.hmacShaKeyFor(configuredSecret.getBytes());
        } else {
            // Otherwise generate a secure key for HS256
            this.key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
        }
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return !isTokenExpired(token);
        } catch (Exception e) {
            return false;
        }
    }
}

