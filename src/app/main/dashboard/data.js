const data = {
    detail : [
		{
			title: "Voltage",
			unit: "Volts",
			data: [
				{
					label: "L1",
					value: 110,
				},
				{
					label: "L2",
					value: 121,
				},
				{
					label: "L3",
					value: 121,
				},
				{
					result: true,
					label: "AVG",
					ref: "(U1+U2+U3)/3",
					value: 341,
				},
			]
		},
		{
			title: "Current",
			unit: "Amps",
			data: [
				{
					label: "L1",
					value: 110,
				},
				{
					label: "L2",
					value: 121,
				},
				{
					label: "L3",
					value: 121,
				},
				{
					result: true,
					label: "TOTAL",
					value: 341,
				},
			]
		},
		{
			title: "Frequency",
			unit: "Hertz",
			data: [
				{
					label: "FREQ",
					value: 59.9,
				},
			]
		},
		{
			title: "Active Power",
			unit: "kW",
			data: [
				{
					label: "L1",
					value: 110,
				},
				{
					label: "L2",
					value: 121,
				},
				{
					label: "L3",
					value: 121,
				},
				{
					result: true,
					label: "TOTAL",
					value: 341,
				},
			]
		},
		{
			title: "Reactive Power",
			unit: "kVAr",
			data: [
				{
					label: "L1",
					value: 110,
				},
				{
					label: "L2",
					value: 121,
				},
				{
					label: "L3",
					value: 121,
				},
				{
					result: true,
					label: "TOTAL",
					value: 341,
				},
			]
		},
		
		{
			title: "Apparent Power",
			unit: "kVA",
			data: [
				{
					label: "L1",
					value: 110,
				},
				{
					label: "L2",
					value: 121,
				},
				{
					label: "L3",
					value: 121,
				},
				{
					result: true,
					label: "TOTAL",
					value: 341,
				},
			]
		},
		{
			title: "Active Energy",
			unit: "kWh",
			data: [
				{
					label: "L1",
					value: 110,
				},
				{
					label: "L2",
					value: 121,
				},
				{
					label: "L3",
					value: 121,
				},
				{
					result: true,
					label: "TOTAL",
					value: 341,
				},
			]
		},
		{
			title: "Reactive Evergy",
			unit: "kVARh",
			data: [
				{
					label: "L1",
					value: 110,
				},
				{
					label: "L2",
					value: 121,
				},
				{
					label: "L3",
					value: 121,
				},
				{
					result: true,
					label: "TOTAL",
					value: 341,
				},
			]
		},
		{
			title: "Phase Angle",
			unit: "Degree",
			data: [
				{
					label: "L1",
					value: 110,
				},
				{
					label: "L2",
					value: 121,
				},
				{
					label: "L3",
					value: 121,
				}
			]
		},
		{
			title: "Voltage THD",
			unit: "V%THD",
			data: [
				{
					label: "L1",
					value: 4.0,
				},
				{
					label: "L2",
					value: 4.1,
				},
				{
					label: "L3",
					value: 4.1,
				},
				{
					result: true,
					label: "AVG",
					value: 4.1,
				},
			]
		},
		{
			title: "Current THD",
			unit: "I%THD",
			data: [
				{
					label: "L1",
					value: 0.12,
				},
				{
					label: "L2",
					value: 0.1,
				},
				{
					label: "L3",
					value: 0.1,
				},
				{
					result: true,
					label: "AVG",
					value: 0.1,
				},
			]
		},
		{
			title: "Power Factor",
			unit: "PF",
			data: [
				{
					label: "L1",
					value: 0.999,
				},
				{
					label: "L2",
					value: 0.999,
				},
				{
					label: "L3",
					value: 0.999,
				},
				{
					result: true,
					label: "AVG",
					value: 0.999,
				},
			]
		},
	],
	statistic : [
		{
			title: "Maximum registered",
			data: [
				{
					label: "POWER DEMAND",
					unit: "kW",
					value: 110,
				},
				{
					label: "CURRENT DEMAND",
					unit: "A",
					value: 110,
				},
				{
					label: "L1 VOLTAGE",
					unit: "V",
					value: 110,
				},
				{
					label: "L2 VOLTAGE",
					unit: "V",
					value: 110,
				},
				{
					label: "L3 VOLTAGE",
					unit: "V",
					value: 110,
				},
				{
					label: "FREQUENCY",
					unit: "Hz",
					value: 110,
				},
				{
					label: "POWER FACTOR",
					unit: "pF",
					value: 110,
				},
			]
		},
		{
			title: "Active Energy",
			unit: "kWh",
			data: [
				{
					label: "DELIVERED",
					value: 59.9,
				},
				{
					label: "RECEIVED",
					value: 59.9,
				},
				{
					result: true,
					label: "DEL-REC",
					value: 0,
				},
			]
		},
		{
			title: "Reactive Energy",
			unit: "kVARh",
			data: [
				{
					label: "DELIVERED",
					value: 59.9,
				},
				{
					label: "RECEIVED",
					value: 59.9,
				},
				{
					result: true,
					label: "DEL-REC",
					value: 0,
				},
			]
		},
		{
			title: "Aparent Energy",
			unit: "kVAh",
			data: [
				{
					label: "DEL-REC",
					value: 59.9,
				},
			]
		},
		{
			title: "Active Power",
			unit: "kW",
			data: [
				{
					label: "DEL-REC",
					value: 59.9,
				},
			]
		},
		{
			title: "Rective Power",
			unit: "kVAR",
			data: [
				{
					label: "DEL-REC",
					value: 59.9,
				},
			]
		},
		{
			title: "Aparent Power",
			unit: "kVA",
			data: [
				{
					label: "DEL-REC",
					value: 59.9,
				},
			]
		},
	],
	info : [
		{
			title: "Device info",
			data: [
				{
					label: "Name",
					value: "Dakton",
				},
				{
					label: "Firmware",
					value: "1.2",
				},
				{
					label: "Serial Number",
					value: "DK23213",
				},
				{
					label: "Uptime",
					value: "12 min",
				},
				{
					label: "Device Time",
					value: "Oct 21 2020",
				},
				{
					label: "NTP last update",
					value: "121 min ago",
				},
			]
		},
		{
			title: "Status",
			data: [
				{
					label: "Status",
					value: "OK",
				},
				{
					label: "Msg Total Sent",
					value: 12332,
				},
				{
					label: "Msg Queued",
					value: 0,
				},
				{
					label: "Msg last sent",
					value: "12 min ago",
				},
			]
		},
	]
}
export default data;