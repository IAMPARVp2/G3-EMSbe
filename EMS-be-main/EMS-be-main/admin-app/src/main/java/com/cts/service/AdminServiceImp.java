package com.cts.service;

import java.util.List;
import java.util.Map;

import com.cts.entity.User;
import com.cts.entity.Event; // added

public interface AdminServiceImp {
    User addAdmin(User user);
    List<User> getAll();

    Event approveEvent(int eventId);
    Event rejectEvent(int eventId, String reason);
    User patchUser(int id, Map<String, String> updates);
}