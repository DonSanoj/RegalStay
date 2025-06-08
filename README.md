# 🏨 Hotel Management System

A full-featured, modern hotel management system designed for enterprise-grade operations such as a 7-star hotel. Built using **Spring Boot** for the backend, **React + Vite** for the frontend, and **MySQL** as the database.

## 📌 Project Overview

This system is built with a **monolithic architecture** and includes robust modules to handle everything from bookings, user roles, and payments to services, maintenance, and analytics.

---

## 🛠️ Tech Stack

### 🔙 Backend
- **Java + Spring Boot**
- **Spring Security (JWT Auth)**
- **Spring Data JPA**
- **MySQL Database**
- **Lombok**
- **Maven**

### 🌐 Frontend
- **React + Vite**
- **React Router**
- **Axios**
- **Tailwind CSS / Material UI**

---

## 📚 Features

### ✅ Authentication & User Roles
- JWT-based secure login
- Role-based access (Admin, Manager, Receptionist, Housekeeping, Customer)
- Password encryption, reset, and validation

### 🏨 Room Management
- Create, edit, delete apartments
- Set room types, amenities, prices, and availability
- Manage seasonal pricing

### 📅 Booking Management
- Room availability search with filters
- Real-time room status updates
- Create, update, cancel bookings
- Track check-in/check-out status

### 👤 Customer Management
- Customer registration and profile management
- Booking history
- Loyalty tiers (Silver, Gold, Platinum)

### 🧾 Billing & Payments
- Auto invoice generation
- Stripe / PayPal / Cash support
- Tax and discount handling
- PDF invoice download

### 🛎️ Service Management
- Room service, laundry, spa, transport bookings
- Scheduled service times
- Charges automatically added to billing

### 🧹 Housekeeping
- Task scheduling
- Mark apartments as cleaned
- Room condition reporting

### 🛠️ Maintenance
- Maintenance request management
- Task assignment and resolution tracking

### 📈 Reporting & Analytics
- Occupancy rates
- Income reports
- Service usage statistics
- Export as PDF/CSV

### 📩 Notifications
- Email & SMS notifications for key actions
- In-app alerts for staff

### 🔐 Security & Audit Logs
- Session control, login attempts
- Action history logs
- System monitoring
