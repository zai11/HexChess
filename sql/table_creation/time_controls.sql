CREATE TABLE `hexchess_server`.`time_controls` (
  `time_control_id` INT NOT NULL AUTO_INCREMENT,
  `time` INT NOT NULL,
  `time_unit` VARCHAR(16) NOT NULL,
  `increment` INT NOT NULL,
  `increment_unit` VARCHAR(16) NOT NULL,
  PRIMARY KEY (`time_control_id`),
  UNIQUE INDEX `time_control_id_UNIQUE` (`time_control_id` ASC) VISIBLE);