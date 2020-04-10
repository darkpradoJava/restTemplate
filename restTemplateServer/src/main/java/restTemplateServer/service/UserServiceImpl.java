package restTemplateServer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import restTemplateServer.dao.RoleDao;
import restTemplateServer.dao.UserDao;
import restTemplateServer.model.Role;
import restTemplateServer.model.User;


import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Transactional
@Service
public class UserServiceImpl implements UserService {

    private UserDao userDao;
    private RoleDao roleDao;

    @Autowired
    public void setUserDao(UserDao userDao, RoleDao roleDao) {
        this.userDao = userDao;
        this.roleDao = roleDao;
    }

    @Override
    public void add(User user, String role) {
        Set<Role> setRoles = new HashSet<>();
        if(role.equals("ADMIN")) {
            setRoles.add(roleDao.findById(1L).get());
        } else {
            setRoles.add(roleDao.findById(2L).get());
        }
        user.setRoles(setRoles);
        userDao.save(user);
    }

    @Override
    public void update(User user, String role) {
        Set<Role> setRoles = new HashSet<>();
        if(role.equals("ADMIN")) {
            setRoles.add(roleDao.findById(1L).get());
        } else {
            setRoles.add(roleDao.findById(2L).get());
        }
        user.setRoles(setRoles);
        userDao.save(user);
    }

    @Override
    public void delete(User user) {
        userDao.delete(user);
    }

    @Override
    public List<User> getUsers() {
        return (List<User>) userDao.findAll();
    }

    @Override
    public User getUserById(Long id) {
        Optional<User> user = userDao.findById(id);
        return user.get();
    }

    @Override
    public User getByUsername(String username) {
        return userDao.findByUsername(username);
    }

}
