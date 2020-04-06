package restTemplateServer.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import restTemplateServer.model.Role;

@Repository
public interface RoleDao extends CrudRepository<Role, Long> {

}
