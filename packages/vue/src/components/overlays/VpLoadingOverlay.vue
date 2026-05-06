<template>
  <Transition name="vp-fade">
    <div class="vp-overlay">
      <slot>
        <div class="vp-spinner" />
      </slot>
    </div>
  </Transition>
</template>
