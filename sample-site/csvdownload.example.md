Basic example

```html
const data = [
  ['name', 'age'],
  ['Ahmed', 12],
  ['John', 8]
];
<CSVDownload data={data} />
```

Another example of `CSVDownload`

```example
const headers  = ['firstname', 'lastname', 'email'] ;
const data = [
  ['Ahmed', 'Tomi' , 'ah@smthing.co.com'] ,
  ['Raed', 'Labes' , 'rl@smthing.co.com'] ,
  ['Yezzi','Min l3b', 'ymin@cocococo.com']
];
const iWantToDownload = false; // <--- double click on "false", and change it to "true"
if (iWantToDownload) {
   <CSVDownload data={data} headers={headers} />  
} else {
   <div>Click on "Show Code" below right, and try to change the value of "iWantToDownload" from "false" to true , then, a new window will be opened to trigger the download of CSV file</div>
}

```

## Note:
> This component triggers the download directly once it is mounted, So , be careful to choose the suitable time to mount it.

Suppress \uFEFF with prop

```html
const data = [
  ['name', 'age'],
  ['Ahmed', 12],
  ['John', 8]
];
<CSVDownload data={data} uFEFF={ false } />
```

## Note:
> the uFEFF prop defaults to true