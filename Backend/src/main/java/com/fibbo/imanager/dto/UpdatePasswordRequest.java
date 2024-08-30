package com.fibbo.imanager.dto;

import com.fibbo.imanager.model.User;

public record UpdatePasswordRequest(User user, String oldPassword, String newPassword) {}
