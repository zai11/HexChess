
import json

data = {}

file = 'tile_data_black'

with open(file + '.json') as json_file:
    data = json.load(json_file)

    for item in data:
        item['x'] = item['x'] - 300

with open(file + '.json', 'w') as json_file:
    json_file.write(json.dumps(data, indent=4));
