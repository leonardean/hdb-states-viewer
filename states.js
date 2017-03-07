var program = require('commander')
var request = require('request')
var beautify = require("json-beautify")
var fs = require('fs')

program
	.version('1.0.0')
	.option('-i, --vendorThingID <string>', 'Set vendor thing ID. Default to <all>', 'all')
	.option('-l, --last [/^([0-9]+)([mhdM])$/i]', 'Set time range. Default to <1d>', /^([0-9]+)([mhdM])$/i, '1d')
	.option('-f, --from [integer]', 'Set from point. Default to <0>', 0)
	.option('-s, --size [integer]', 'Set return size. Default to <10000>', 10000)
	.option('-o, --orderBy [string]', 'Set order field. Default to <timeStamp>', 'timeStamp')
	.option('-O, --orderAs [/^(asc|desc)$/i]', 'Set order orientation. Default to [desc]', /^(asc|desc)$/i, 'desc')
	.option('-S, --saveAs [string]', 'Set destination file name')
	.description('A command tool to get hdb states history')
	.parse(process.argv)

// console.log(program.vendorThingID)
// console.log(program.last)
// console.log(program.from)
// console.log(program.size)
// console.log(program.orderBy)
// console.log(program.orderAs)
// console.log(program.saveAs)

var timeRangeRegex = /^([0-9]+)([mhdM])$/i
var matches = timeRangeRegex.exec(program.last)
var deviceID = (program.vendorThingID === 'all') ? "(.*)" : program.vendorThingID
var endTime = new Date()
var startTime = new Date()
switch (matches[2]) {
	case 'h':
		startTime.setHours(startTime.getHours() - matches[1])
		break
	case 'm':
		startTime.setMinutes(startTime.getMinutes() - matches[1])
		break
	case 'd':
		startTime.setDate(startTime.getDate() - matches[1])
		break
	case 'M':
		startTime.setMonth(startTime.getMonth() - matches[1])
		break
}
var sort = {}
sort[program.orderBy] = program.orderAs

var options = {
	method: 'POST',
	url: 'http://121.199.7.69:9200/26f86a21/_search',
	headers: {
		'content-type': 'application/json',
		authorization: 'Bearer super_token'
	},
	body: {
		query: {
			bool: {
				filter: [{
					regexp: {
						'state.deviceID': deviceID
					}
				}, {
					range: {
						timeStamp: {
							gte: startTime,
							lte: endTime
						}
					}
				}]
			}
		},
		sort: sort,
		from: program.from,
		size: program.size
	},
	json: true
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  var result = []
  body.hits.hits.forEach(function(data) {
  	result.push(data['_source'])
  })
  console.log(beautify(result, null, 2, 100))
	if (program.saveAs)
		console.log(program.saveAs)
		fs.writeFile(program.saveAs, beautify(result, null, 2, 100), function(error) {
			if (error) {
				console.error("write error:  " + error.message);
			} else {
				console.log("Successful Write to " + program.saveAs);
			}
		})
});

