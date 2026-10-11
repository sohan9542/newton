<script setup>
import {
  RiSearchLine,
  RiShoppingBagLine,
  RiBarChartHorizontalLine,
  RiStarFill,
  RiCloseLargeLine,
} from '@remixicon/vue'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { ref, onMounted } from 'vue'
import { NAV_ITEMS, SOCIAL_LINKS } from '../constants/navigation'
import { products, PRODUCT_DESCRIPTION } from '../data/products'
import { formatPrice, getTransitionAction, snapCarouselX } from '../utils/navigation'

const ground = ref(null)
const left = ref(null)
const right = ref(null)
const carousel = ref(null)
const product = ref(null)
const items = ref(null)
const cards = ref([])
const index2 = ref(null)
const routePath = ref('/')
const mm = gsap.matchMedia()

let draggableInstance = null

gsap.registerPlugin(Draggable)

const heroAnimationOpen = () => {
  gsap.to(ground.value, {
    scale: 1,
    transform: 'translateX(0%)',
    duration: 1.3,
    ease: 'power2.inOut',
  })
  gsap.to(left.value, {
    transform: 'translateX(0%)',
    duration: 1.3,
    ease: 'power2.inOut',
  })
  gsap.to(right.value, {
    transform: 'translateX(0%)',
    duration: 1.3,
    ease: 'power2.inOut',
  })
}

const heroAnimationClose = () => {
  gsap.to(left.value, {
    transform: 'translateX(-120%)',
    duration: 1.3,
    ease: 'power2.inOut',
  })
  gsap.to(right.value, {
    transform: 'translateX(120%)',
    duration: 1.3,
    ease: 'power2.inOut',
  })
}

const disableDragging = () => {
  if (draggableInstance?.[0]) {
    draggableInstance[0].disable()
  }
}

const enableDragging = () => {
  if (draggableInstance?.[0]) {
    draggableInstance[0].enable()
  }
}

const productPageAnimationOpen = () => {
  enableDragging()
  heroAnimationClose()
  cards.value = Array.from(carousel.value.querySelectorAll('.carousel-item'))
  gsap.to(ground.value, {
    scale: 1.25,
    transform: 'translateX(10%)',
    duration: 1.3,
    ease: 'power2.inOut',
  })

  gsap.to(product.value, {
    transform: 'translateX(0%)',
    duration: 1.3,
    ease: 'power2.inOut',
  })

  setTimeout(() => {
    gsap.to('.carousel-item #mainImg', {
      transform: 'translateX(0%)',
      duration: 1,
      ease: 'power2.inOut',
    })
  }, 600)

  const itemWidth = items.value.offsetWidth

  draggableInstance = Draggable.create(items.value, {
    type: 'x',
    bounds: carousel.value,
    edgeResistance: 0.75,
    inertia: true,
    dragResistance: 0.1,
    snap: {
      x: (x) => snapCarouselX(x, itemWidth),
    },
    onDragStart: function () {
      if (this.x > this.startX) {
        gsap.to(ground.value, {
          scale: 1.45,
          transform: 'translateX(13%)',
          duration: 1,
          ease: 'power2.inOut',
        })
      } else if (this.x < this.startX) {
        gsap.to(ground.value, {
          scale: 1.57,
          transform: 'translateX(2%)',
          duration: 1,
          ease: 'power2.inOut',
        })
      }
    },
  })
}

const productPageAnimationClose = () => {
  gsap.to(ground.value, {
    scale: 1.25,
    transform: 'translateX(10%)',
    duration: 1,
    ease: 'power2.inOut',
  })

  mm.add('(min-width: 800px)', () => {
    gsap.to(product.value, {
      transform: 'translateX(300%)',
      duration: 1,
      ease: 'power2.inOut',
    })
  })
  mm.add('(max-width: 600px)', () => {
    gsap.to(product.value, {
      transform: 'translateX(600%)',
      duration: 1,
      ease: 'power2.inOut',
    })
  })

  gsap.to('.carousel-item img', {
    transform: 'translateX(100%)',
    duration: 1,
    ease: 'power2.inOut',
  })

  cards.value.forEach((item) => {
    gsap.to(item, {
      width: '350px',
      transform: 'translateX(0%)',
      opacity: 1,
      duration: 1,
    })
  })

  const card = cards.value[index2.value]
  if (!card) return

  const image = card.querySelector('#mainImg')
  const h1Element = card.querySelector('h1')
  const desc = card.querySelector('#desc')
  const dep = card.querySelector('#dep')
  const productClose = document.querySelector('#productClose')

  gsap.to(image, {
    x: 0,
    y: 0,
    scale: 1,
  })
  gsap.to(dep, {
    x: 0,
    y: 0,
    opacity: 0,
  })
  gsap.to(productClose, {
    opacity: 0,
  })
  gsap.to(h1Element, {
    x: 0,
    y: 0,
  })
  gsap.to(desc, {
    x: 0,
    y: 0,
  })
}

const expandCard = (index) => {
  disableDragging()

  gsap.to(ground.value, {
    scale: 1.5,
    transform: 'translateX(0%)',
    duration: 1,
    ease: 'power2.inOut',
  })

  cards.value.forEach((item, i) => {
    if (i !== index) {
      gsap.to(item, {
        width: '350px',
        duration: 2,
        transform: 'translateX(3000%)',
        opacity: 0,
        ease: 'power2.inOut',
      })
    }
  })

  index2.value = index
  const card = cards.value[index]
  const image = card.querySelector('#mainImg')
  const h1Element = card.querySelector('h1')
  const desc = card.querySelector('#desc')
  const dep = card.querySelector('#dep')
  const productClose = document.querySelector('#productClose')

  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight
  const rect = image.getBoundingClientRect()
  const targetX = windowWidth / 2 - rect.width / 2
  const targetY = windowHeight / 2 - rect.height / 2

  mm.add('(min-width: 800px)', () => {
    const imageAnim = gsap.to(image, {
      x: targetX - 250 - rect.left,
      y: targetY - 70 - rect.top,
      scale: 1.3,
      ease: 'power2.inOut',
      duration: 1,
    })

    const depAnim = gsap.to(dep, {
      x: targetX - 100 - rect.left,
      y: targetY + 30 - rect.top,
      opacity: 1,
      ease: 'power2.inOut',
      duration: 1,
    })

    const productCloseAnim = gsap.to(productClose, {
      opacity: 1,
      ease: 'power2.inOut',
      duration: 1,
      scale: 1,
    })

    const h1ElementAnim = gsap.to(h1Element, {
      x: targetX + 290 - rect.left,
      y: targetY + 50 - rect.top,
      ease: 'power2.inOut',
      duration: 1,
    })

    const descAnim = gsap.to(desc, {
      x: targetX + 295 - rect.left,
      y: targetY - 70 - rect.top,
      ease: 'power2.inOut',
      duration: 1,
    })

    return () => {
      imageAnim.kill()
      depAnim.kill()
      productCloseAnim.kill()
      h1ElementAnim.kill()
      descAnim.kill()
    }
  })

  mm.add('(max-width: 600px)', () => {
    const imageAnim = gsap.to(image, {
      x: targetX - 50 - rect.left,
      y: targetY - 100 - rect.top,
      scale: 0.7,
      ease: 'power2.inOut',
      duration: 1,
    })

    const depAnim = gsap.to(dep, {
      x: targetX + 240 - rect.left,
      y: targetY - 230 - rect.top,
      opacity: 1,
      scale: 0.6,
      ease: 'power2.inOut',
      duration: 1,
    })

    const productCloseAnim = gsap.to(productClose, {
      opacity: 1,
      ease: 'power2.inOut',
      duration: 1,
      top: '300px',
      right: '40px',
      scale: 1,
    })

    const h1ElementAnim = gsap.to(h1Element, {
      x: targetX - rect.left,
      y: targetY + 190 - rect.top,
      ease: 'power2.inOut',
      duration: 1,
    })

    const descAnim = gsap.to(desc, {
      x: targetX - rect.left,
      y: targetY + 20 - rect.top,
      ease: 'power2.inOut',
      duration: 1,
    })

    return () => {
      imageAnim.kill()
      depAnim.kill()
      productCloseAnim.kill()
      h1ElementAnim.kill()
      descAnim.kill()
    }
  })
}

const pushRoute = (route) => {
  const action = getTransitionAction(routePath.value, route)

  if (action === 'open-products') {
    productPageAnimationOpen()
  } else if (action === 'close-products') {
    productPageAnimationClose()
    heroAnimationOpen()
  }

  routePath.value = route
}

onMounted(() => {
  heroAnimationOpen()
})
</script>

<template>
  <div class="h-screen overflow-hidden w-full">
    <img
      ref="ground"
      class="w-full h-full transform scale-[1.5] translate-x-[10%] object-cover"
      src="/dark.jpg"
      alt=""
    />

    <div class="absolute h-screen overflow-hidden bg-black bg-opacity-50 top-0 left-0 w-full z-10">
      <div class="container mx-auto">
        <div class="flex items-center flex-col lg:flex-row gap-2 justify-between my-5">
          <div class="flex items-center gap-10">
            <a
              v-for="link in SOCIAL_LINKS"
              :key="link.label"
              class="text-white hover:text-[#F8D8A0]"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ link.label }}
            </a>
          </div>
          <img
            class="w-[110px] cursor-pointer"
            src="/logo.png"
            alt="Newton"
            @click="pushRoute('/')"
          />
          <div class="flex items-center gap-12">
            <RiSearchLine size="30px" color="white" class="cursor-pointer" />
            <RiShoppingBagLine size="30px" color="white" class="cursor-pointer" />
            <RiBarChartHorizontalLine size="30px" color="white" class="cursor-pointer" />
          </div>
        </div>

        <div class="flex items-center justify-center gap-2 lg:gap-16 w-full my-[30px]">
          <p
            v-for="item in NAV_ITEMS"
            :key="item.path"
            :class="`uppercase ${
              routePath === item.path ? 'text-primary' : 'text-white'
            } text-[16px] lg:text-[24px] font-medium cursor-pointer hover:text-[#F8D8A0]`"
            @click="pushRoute(item.path)"
          >
            {{ item.label }}
          </p>
        </div>
      </div>

      <div class="container mx-auto">
        <div class="w-full relative">
          <div ref="left" class="transform -translate-x-[100%]">
            <h1
              class="text-primary text-[80px] leading-[80px] lg:text-[180px] font-bold lg:leading-[170px]"
            >
              HAPPINESS <br />
              SMELLING BREAD
            </h1>
            <p class="lg:w-[40%] mt-3 lg:mt-[50px] text-[20px] text-white">
              Our Loaves Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi et esse
              error inventore cumque nihil architecto iure! Enim soluta esse maxime impedit laborum,
              aperiam, est id, velit quibusdam iure quod. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Accusamus, id! esse error inventore cumque nihil architecto.
            </p>
            <p
              class="text-primary text-[24px] uppercase mt-5 underline cursor-pointer"
              @click="pushRoute('/products')"
            >
              Choose Your Loaf
            </p>
          </div>
          <img
            ref="right"
            src="/bread.png"
            class="absolute w-[800px] transform translate-x-[100%] -right-[140px] -bottom-[250px] z-30"
            alt=""
          />
        </div>
      </div>

      <div
        ref="product"
        class="mt-[100px] w-full transform translate-x-[300%] absolute z-50 top-[200px] lg:top-[120px] left-0"
      >
        <div class="container mx-auto">
          <div ref="carousel" class="carousel-wrapper relative">
            <div ref="items" class="carousel flex w-max">
              <div
                v-for="(item, index) in products"
                :key="index"
                class="carousel-item relative lg:w-[350px] h-full min-h-[600px] mr-5 lg:mr-[70px]"
                @click="expandCard(index)"
              >
                <h1
                  class="text-[50px] lg:text-[90px] w-[200px] lg:w-[350px] text-wrap leading-[50px] lg:leading-[90px] font-bold text-primary"
                >
                  {{ item.title }}
                </h1>
                <div class="w-[350px]">
                  <img
                    id="mainImg"
                    class="h-[200px] relative transform translate-x-[100%] -top-5 lg:-top-9 w-full object-cover"
                    :src="item.image"
                    :alt="item.title"
                  />
                </div>
                <img
                  id="dep"
                  src="/dep.png"
                  class="w-[300px] cursor-pointer opacity-0 transform -translate-x-[100%] absolute bottom-[50px] -left-[120px] z-50"
                  alt=""
                />

                <div id="desc" class="w-[350px]">
                  <p class="text-white text-[20px]">
                    {{ PRODUCT_DESCRIPTION }}
                  </p>
                  <div class="text-primary mt-[15px] flex items-center gap-1">
                    <RiStarFill
                      v-for="star in 5"
                      :key="star"
                      width="24px"
                      height="24px"
                      :color="star <= item.rating ? '#F8D8A0' : '#ffffff4f'"
                    />
                  </div>
                  <div class="flex items-center gap-10 mt-0">
                    <h1 class="text-[55px] text-primary">
                      <span class="text-[30px] mr-2">$</span>{{ formatPrice(item.price) }}
                    </h1>
                    <button
                      class="px-[50px] bg-primary font-semibold text-[20px] py-2 rounded-[32px]"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RiCloseLargeLine
        id="productClose"
        class="absolute cursor-pointer right-[20%] top-[20%] z-[500] scale-0"
        width="30px"
        height="30px"
        color="#fff"
        @click="pushRoute('/')"
      />
    </div>
  </div>
</template>

<style>
.carousel-wrapper {
  width: 100%;
  margin: 0 auto;
}

.carousel-item {
  cursor: grab;
}

.carousel-item:active {
  cursor: grabbing;
}
</style>
