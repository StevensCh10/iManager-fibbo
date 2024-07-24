package com.fibbo.imanager.dto;

import com.fibbo.imanager.model.User;

public record ResponseDTO (User user, String token) { }