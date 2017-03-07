# hdb-states-viewer
### Dependency installatio
```
npm install
```
### How to use
```
node states --help
```
```
 Usage: states [options]

  A command tool to get hdb states history

  Options:

    -h, --help                          output usage information
    -V, --version                       output the version number
    -i, --vendorThingID <string>        Set vendor thing ID. Default to <all>
    -l, --last [/^([0-9]+)([mhdM])$/i]  Set time range. Default to <1d>
    -f, --from [integer]                Set from point. Default to <0>
    -s, --size [integer]                Set return size. Default to <10000>
    -o, --orderBy [string]              Set order field. Default to <timeStamp>
    -O, --orderAs [/^(asc|desc)$/i]     Set order orientation. Default to [desc]
    -S, --saveAs [string]               Set destination file name
```
### Examples
1. Default query
 ```
 node states
 ```
 this command queries history states data of all devices during last day, with maximum display of 10000 records, ordered by `timeStamp` in descending orientation

2. Custom query
 ```
 node states -i 0003 -l 2h -f 20 -s 20 -o timeStamp -O asc
 ```
 this command queries history states data of device `0003` during last 2 hours, with maximum display of 20 recods, ordered by `timeStamp` in ascending orientation. this query skips the first 20 records. skipping is useful when pagination is needed.
 
3. Save result to local file
 ```
 node states -i 0003 -l 2h -f 20 -s 20 -o timeStamp -O asc -S data.json
 ```
 this command queries the same data as the previous one, but saves the result data as local file `data.json`
 
Please note that one option only support one value, command like below is not support:
```
node states -i 0001 0002
```
