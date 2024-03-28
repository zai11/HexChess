CREATE TABLE `hexchess_server`.`games` (
  `game_id` INT NOT NULL AUTO_INCREMENT,
  `black_player` INT NOT NULL,
  `white_player` INT NOT NULL,
  `date_started` VARCHAR(32) NOT NULL,
  `result` INT NOT NULL DEFAULT 0,
  `completed` TINYINT NOT NULL DEFAULT 0,
  `time_control` INT NOT NULL,
  `fen` VARCHAR(256) NOT NULL,
  `pgn` MEDIUMTEXT NOT NULL,
  `player_turn` INT NOT NULL,
  `clock_white` INT NOT NULL DEFAULT 0,
  `clock_black` INT NOT NULL DEFAULT 0,
  `last_tick` INT NULL,
  `draw_offer` INT NULL,
  PRIMARY KEY (`game_id`),
  UNIQUE INDEX `game_id_UNIQUE` (`game_id` ASC) VISIBLE,
  INDEX `games.black_player_idx` (`black_player` ASC) VISIBLE,
  INDEX `games.white_player_idx` (`white_player` ASC) VISIBLE,
  INDEX `games.time_control_idx` (`time_control` ASC) VISIBLE,
  INDEX `games.draw_offer_idx` (`draw_offer` ASC) VISIBLE,
  CONSTRAINT `games.black_player`
    FOREIGN KEY (`black_player`)
    REFERENCES `hexchess_server`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `games.white_player`
    FOREIGN KEY (`white_player`)
    REFERENCES `hexchess_server`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `games.time_control`
    FOREIGN KEY (`time_control`)
    REFERENCES `hexchess_server`.`time_controls` (`time_control_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `games.draw_offer`
    FOREIGN KEY (`draw_offer`)
    REFERENCES `hexchess_server`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);