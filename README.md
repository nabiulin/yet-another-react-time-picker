# yet-another-react-time-picker

## Install

```
npm install --save yet-another-react-time-picker
```

## Basic usage

At a minimum a `TimePicker` needs an `hour`, `minute`, `second` and `onChange` property.

```javascript
export default function MyComponent({hour, minute, second, handleChange}) {
  return (
    <TimePicker
      name="myTimePicker"
      hour={hour}
      minute={minute}
      second={second}
      onChange={(h, m, s) => handleChange(h, m, s)}
    />
  );
}
```

## Hide time fields

You can hide time fields if they are not important to you.  This example hides the `second` field.

```javascript
export default function MyComponent(props) {
  const showSecond = false;
  return <TimePicker {...props} showSecond/>;
}
```

You can do the same with `showHour` and `showMinute`.

## Set a maximum time

You can specify that the `TimePicker` not be allowed to go beyond a given max time using the `maxHour`, `maxMinute` and `maxSecond` properties.

```javascript
export default function MyComponent(props) {
  return (
    <div>
      <TimePicker {...props} maxHour={22} maxMinute={18} maxSecond={25}/>
    </div>
  );
}
```

## Props

1. `className` - Optional classes to pass to the underlying `input` field.
2. `name` - Required property that will be used for the underlying `input` fields.  The main `input` field will inherit this name, while the individual time fields will be prepended, ie: `mytime-hour`.
3. `hour` - Required property for the initial hours.
4. `showHour` - Optional boolean that can be set to `false` if you want to hide the hours field.
5. `maxHour` - Optional numeric value for max hours.
6. `minute` - Required property for the initial minutes.
7. `showMinute` - Optional boolean that can be set to `false` if you want to hide the minutes field.
8. `maxMinute` - Optional numeric value for max minutes.
9. `second` - Required property for initial seconds.
10. `showSecond` - Optional boolean that can be set to `false` if you want to hide the seconds field.
11. `maxSecond` - Optional numeric value for the max seconds.
12. `onChange` - Required function that will accept 3 parameters for `hours`, `minutes` and `seconds` when the time is changed.

## Styling

```css
@import "node_modules/yet-another-react-time-picker/dist/styles/timepicker.min.css"
```