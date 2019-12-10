# Viewport Spy


## Markup

```
<div class="ViewportSpy">
  <section>1</section>
  <section>2</section>
  <section data-observe-intersection="true" data-in-view="0.5" data-trigger-points="0.5">3</section>
  <section>4</section>
  <section>5</section>
</div>
```

## JS

```
const myViewportSpy = new ViewportSpy();
myViewportSpy.init({});
```

## Options

* container: (default: '.ViewportSpy')
* selector: (default: '[data-observe-intersection]')
* visitedClass: (default: 'visited')
* inViewportClass: (default: 'in-viewport')