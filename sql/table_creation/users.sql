CREATE TABLE `hexchess_server`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(32) NOT NULL,
  `email` VARCHAR(256) NOT NULL,
  `password` VARCHAR(64) NOT NULL,
  `logged_in` TINYINT NOT NULL DEFAULT 0,
  `uat` VARCHAR(64) NULL,
  `elo` INT NOT NULL DEFAULT 1000,
  `completed_game_count` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);