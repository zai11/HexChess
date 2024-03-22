CREATE TABLE `hexchess_server`.`game_requests` (
  `game_request_id` INT NOT NULL AUTO_INCREMENT,
  `player_id` INT NOT NULL,
  `date_created` VARCHAR(32) NOT NULL,
  `time_control` INT NOT NULL,
  PRIMARY KEY (`game_request_id`),
  UNIQUE INDEX `game_request_id_UNIQUE` (`game_request_id` ASC) VISIBLE,
  INDEX `game_request.player_id_idx` (`player_id` ASC) VISIBLE,
  INDEX `game_requests.time_control_idx` (`time_control` ASC) VISIBLE,
  CONSTRAINT `game_requests.player_id`
    FOREIGN KEY (`player_id`)
    REFERENCES `hexchess_server`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `game_requests.time_control`
    FOREIGN KEY (`time_control`)
    REFERENCES `hexchess_server`.`time_controls` (`time_control_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
