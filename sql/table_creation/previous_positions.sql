CREATE TABLE `hexchess_server`.`previous_positions` (
  `previous_position_id` INT NOT NULL AUTO_INCREMENT,
  `game_id` INT NOT NULL,
  `fen` VARCHAR(256) NOT NULL,
  PRIMARY KEY (`previous_position_id`),
  UNIQUE INDEX `previous_position_id_UNIQUE` (`previous_position_id` ASC) VISIBLE,
  CONSTRAINT `previous_positions.game_id`
    FOREIGN KEY (`game_id`)
    REFERENCES `hexchess_server`.`games` (`game_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
