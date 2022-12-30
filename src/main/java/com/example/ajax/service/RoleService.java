package com.example.ajax.service;

import com.example.ajax.model.Role;
import com.example.ajax.repository.IRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {
    @Autowired
    private IRoleRepository iRoleRepository;

    public Role findByName(String name) {
        return iRoleRepository.findByName(name);
    }
}
