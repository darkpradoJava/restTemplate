package restTemplateServer.service;

import restTemplateServer.model.User;

import java.util.List;

public interface UserService {

    void add(User user, String role);
    void update(User user, String role);
    void delete(User user);
    List<User> getUsers();
    User getUserById(Long id);
    User getByUsername(String username);

}
