CREATE TABLE `hexchess_server`.`logged_in_users` (
  `logged_in_users_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `time_logged_in` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`logged_in_users_id`),
  UNIQUE INDEX `logged_in_users_id_UNIQUE` (`logged_in_users_id` ASC) VISIBLE,
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) VISIBLE,
  CONSTRAINT `logged_in_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `hexchess_server`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);