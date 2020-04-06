package restTemplateServer.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import restTemplateServer.model.User;

@Repository
public interface UserDao extends CrudRepository<User, Long> {

    User findByUsername(String username);

}
