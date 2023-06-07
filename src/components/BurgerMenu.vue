<template>
    <div>
        <div class="hamburger-menu">
            <input id="menu__toggle" type="checkbox" />
            <label class="menu__btn" for="menu__toggle">
            <div class="menu__btn_fix"></div>
            <span></span>
            </label>

            <ul class="menu__box">
            <li><RouterLink to="/loot" @click="closeMenu" class="menu__item">Looter</RouterLink></li>
            <li><RouterLink to="/items" @click="closeMenu" class="menu__item">Items</RouterLink></li>
            <li><RouterLink to="/spells" @click="closeMenu" class="menu__item">Spells</RouterLink></li>
            </ul>
        </div>
    </div>
</template>
<script>
import { RouterLink } from 'vue-router';
export default {
    methods: {
        closeMenu() {
            document.querySelector("#menu__toggle").checked = false;
        }
    }
}
</script>
<style>
#menu__toggle {
  opacity: 0;
}
#menu__toggle:checked + .menu__btn > span {
  transform: rotate(45deg);
}
#menu__toggle:checked + .menu__btn > span::before {
  top: 0;
  transform: rotate(0deg);
}
#menu__toggle:checked + .menu__btn > span::after {
  top: 0;
  transform: rotate(90deg);
}
#menu__toggle:checked ~ .menu__box {
  left: 0 !important;
}
.menu__btn {
  position: fixed;
  top: 20px;
  left: 20px;
  width: 26px;
  height: 26px;
  cursor: pointer;
  z-index: 1;
}
.menu__btn > span,
.menu__btn > span::before,
.menu__btn > span::after {
  display: block;
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: #616161;
  transition-duration: .25s;
}
.menu__btn > span::before {
  content: '';
  top: -8px;
}
.menu__btn > span::after {
  content: '';
  top: 8px;
}
.menu__box {
  display: block;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: -100%;
  width: 300px;
  height: 100%;
  margin: 0;
  padding: 80px 0;
  list-style: none;
  background-color: #ECEFF1;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, .4);
  transition-duration: .25s;
}
.menu__item {
  display: block;
  padding: 12px 24px;
  color: #333;
  font-size: 20px;
  font-weight: 600;
  text-decoration: none;
  transition-duration: .25s;
}
.menu__item:hover {
  background-color: #CFD8DC;
}

.menu__btn_fix {
    opacity: 0;
    height: 40px;
    width: 26px;
    position: absolute;
    top: -20px;
}

</style>