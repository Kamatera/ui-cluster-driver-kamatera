#!/usr/bin/env python3
import os
import sys
import json

import requests


DATACENTERS = {
    "AS": "Asia: China, Hong Kong",
    "CA-TR": "North America: Canada, Toronto",
    "EU": "Europe: The Netherlands, Amsterdam",
    "EU-FR": "Europe: Germany, Frankfurt",
    "EU-LO": "Europe: United Kingdom, London",
    "IL-RH": "Middle East: Israel, Rosh Haayin",
    "IL": "Middle East: Israel, Rosh Haayin (2)",
    "IL-HA": "Middle East: Israel, Haifa",
    "IL-PT": "Middle East: Israel, Petach Tikva",
    "IL-TA": "Middle East: Israel, Tel Aviv",
    "US-NY2": "North America: United States, New York, New York",
    "US-SC": "North America: United States, California, Santa Clara",
    "US-TX": "North America: United States, Texas, Dallas"
}

CPU_TYPES = {
    "A": "Availability",
    "B": "General Purpose",
    "D": "Dedicated",
    "T": "Burstable"
}


def main(*args):
    if '--cache' in args and os.path.exists('.data.json'):
        with open('.data.json', 'r') as f:
            data = json.load(f)
    else:
        data = requests.get('https://console.kamatera.com/info/calculator.js.php').text
        data = json.loads("'".join(data.split("'")[1:-1]))
        if '--cache' in args:
            with open('.data.json', 'w') as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
    cpu_types = {}
    datacenters = {}
    diskgb = set()
    for cpu_option in data['cpu'][0]['options']:
        cpu_type = cpu_option['value'][-1]
        cpu_cores = int(cpu_option['value'][:-1])
        cpu_types.setdefault(cpu_type, {}).setdefault('cores', set()).add(cpu_cores)
    for diskgb_option in data['diskGB'][0]['options']:
        diskgb.add(int(diskgb_option['value']))
    for key in data:
        if key.startswith('netPck.'):
            datacenter_id = key.split('.')[1]
            for netpack_option in data[key][0]['options']:
                datacenters.setdefault(datacenter_id, {}).setdefault('netpacks', {})[netpack_option['description']] = netpack_option['value']
        elif key.startswith('ramMB.'):
            cpu_type = key.split('.')[1]
            for rammb_option in data[key][0]['options']:
                cpu_types.setdefault(cpu_type, {}).setdefault('rammb', set()).add(int(rammb_option['value']))
    res = {
        'cpu_types': {
            cpu_type: {
                'name': CPU_TYPES.get(cpu_type),
                'cores': list(sorted(cpu_type_data.get('cores', []))),
                'rammb': list(sorted(cpu_type_data.get('rammb', []))),
            }
            for cpu_type, cpu_type_data in cpu_types.items()
        },
        'datacenters': {
            datacenter: {
                'name': DATACENTERS.get(datacenter),
                'netpacks': datacenter_data['netpacks']
            }
            for datacenter, datacenter_data in datacenters.items()
        },
        'diskgb': list(sorted(diskgb)),
    }
    if '--debug' in args:
        print(json.dumps(res, indent=2, ensure_ascii=False))
    else:
        lines = []
        with open('component/component.js') as f:
            data = f.read()
            predata = data.split('/*!!!!!!!!!!!KAMATERA CONST START!!!!!!!*/')[0]
            postdata = data.split('/*!!!!!!!!!!!KAMATERA CONST END!!!!!!!!!*/')[1]
        with open('component/component.js', 'w') as f:
            f.write(predata + '/*!!!!!!!!!!!KAMATERA CONST START!!!!!!!*/\n')
            f.write('const kamateraOptions = ' + json.dumps(res) + ';\n')
            f.write('/*!!!!!!!!!!!KAMATERA CONST END!!!!!!!!!*/' + postdata)


if __name__ == "__main__":
    main(*sys.argv[1:])
