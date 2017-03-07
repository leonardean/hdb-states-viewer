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
1. 
```
node states
```
this command queries history states data of all devices during last day, with maximum display of 10000 records, ordered by `timeStamp` in descending orientation
