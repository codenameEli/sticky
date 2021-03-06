# Sticky
Create Sticky elements with sensible defaults

#### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
tolerance | int | 'Element height * 2' | Scroll position that triggers the hide of element. By default, it takes the element height and doubles it.
disableWidth | int | null | Width to disable sticky. Compares it to the windows innerWidth before initilization of the Sticky and returns out if less than or equal to the disableWidth passed.
classes.active | string | 'sticky-active' | Classes when element is sticky. Applied to the cloned element.
classes.inactive | string | 'sticky-inactive' | Classes when element is hidden/not-sticky. Applied to the cloned element.

#### Example

Initialize with:

```javascript
$(element).sticky();
 ```

#### Dependencies

jQuery 1.7

#### License

Copyright 2015 Tim "Eli" Dalbey

Licensed under the MIT license.
