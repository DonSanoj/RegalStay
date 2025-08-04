package com.hotelManagementSystem.server.service;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileUploadService {

    private final String uploadDir = "src/main/resources/static/images/profiles/";

    public String uploadProfileImage(MultipartFile file, String adminId) throws IOException {
        if (file.isEmpty()) {
            throw new IOException("File is empty");
        }

        // Validate file type
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new IOException("File must be an image");
        }

        // Validate file size (5MB max)
        if (file.getSize() > 5 * 1024 * 1024) {
            throw new IOException("File size must be less than 5MB");
        }

        // Create upload directory if it doesn't exist
        File uploadDirectory = new File(uploadDir);
        if (!uploadDirectory.exists()) {
            uploadDirectory.mkdirs();
        }

        // Generate unique filename
        String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());
        String fileExtension = "";
        if (originalFilename.contains(".")) {
            fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        
        String fileName = "admin_" + adminId + "_" + UUID.randomUUID().toString() + fileExtension;
        
        // Save file
        Path targetLocation = Paths.get(uploadDir + fileName);
        Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

        // Return the URL path that can be accessed by frontend
        return "/images/profiles/" + fileName;
    }

    public void deleteProfileImage(String imageUrl) {
        if (imageUrl != null && imageUrl.startsWith("/images/profiles/")) {
            try {
                String fileName = imageUrl.substring("/images/profiles/".length());
                Path filePath = Paths.get(uploadDir + fileName);
                Files.deleteIfExists(filePath);
            } catch (IOException e) {
                // Log error but don't throw exception
                System.err.println("Failed to delete old profile image: " + e.getMessage());
            }
        }
    }
}
