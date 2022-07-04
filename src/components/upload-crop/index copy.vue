<script setup lang="ts">
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'

let imgSrc = '/assets/images/berserk.jpg'
let cropImg = ''
let data: any = null

const cropper = ref<any | null>(null)
const flipX = ref<InstanceType<typeof HTMLLinkElement> | null>(null)
const flipY = ref<InstanceType<typeof HTMLLinkElement> | null>(null)
const input = ref<InstanceType<typeof HTMLInputElement> | null>(null)
function cropImage() {
  // get image data for post processing, e.g. upload or setting image src
  cropImg = cropper.value?.getCroppedCanvas()?.toDataURL()
}
function flipXFn() {
  const dom = flipX.value
  let scale: number = dom?.getAttribute('data-scale') as any as number
  scale = scale ? -scale : -1
  cropper.value.scaleX(scale)
  dom?.setAttribute('data-scale', scale as any)
}
function flipYFn() {
  const dom = flipY.value
  let scale: any = dom?.getAttribute('data-scale')
  scale = scale ? -scale : -1
  cropper.value.scaleY(scale)
  dom?.setAttribute('data-scale', scale)
}
function getCropBoxData() {
  data = JSON.stringify(cropper.value.getCropBoxData(), null, 4)
}
function getData() {
  data = JSON.stringify(cropper.value.getData(), null, 4)
}
function move(offsetX: any, offsetY: any) {
  cropper.value.move(offsetX, offsetY)
}
function reset() {
  cropper.value.reset()
}
function rotate(deg: any) {
  cropper.value.rotate(deg)
}
function setCropBoxData() {
  if (!data) return
  cropper.value.setCropBoxData(JSON.parse(data))
}
function setData() {
  if (!data) return
  cropper.value.setData(JSON.parse(data))
}
function setImage(e: any) {
  const file = e.target.files[0]
  if (file.type.indexOf('image/') === -1) {
    alert('Please select an image file')
    return
  }
  if (typeof FileReader === 'function') {
    const reader = new FileReader()
    reader.onload = (event) => {
      imgSrc = event.target?.result as string
      // rebuild cropperjs with the updated source
      cropper.value.replace(event.target?.result)
    }
    reader.readAsDataURL(file)
  } else {
    alert('Sorry, FileReader API not supported')
  }
}
function showFileChooser() {
  input.value?.click()
}
function zoom(percent: any) {
  cropper.value.relativeZoom(percent)
}
</script>

<template>
  <div class="upload-crop">
    <div class="header">
      <h2>Vue CropperJS</h2>
      <a href="https://github.com/Agontuk/vue-cropperjs">Github</a>
    </div>
    <hr />

    <input
      ref="input"
      type="file"
      name="image"
      accept="image/*"
      @change="setImage"
    />

    <div class="content">
      <section class="cropper-area">
        <div class="img-cropper">
          <vue-cropper
            ref="cropper"
            :aspect-ratio="16 / 9"
            :src="imgSrc"
            preview=".preview"
          />
        </div>
        <div class="actions">
          <a href="#" role="button" @click.prevent="zoom(0.2)"> Zoom In </a>
          <a href="#" role="button" @click.prevent="zoom(-0.2)"> Zoom Out </a>
          <a href="#" role="button" @click.prevent="move(-10, 0)">
            Move Left
          </a>
          <a href="#" role="button" @click.prevent="move(10, 0)">
            Move Right
          </a>
          <a href="#" role="button" @click.prevent="move(0, -10)"> Move Up </a>
          <a href="#" role="button" @click.prevent="move(0, 10)"> Move Down </a>
          <a href="#" role="button" @click.prevent="rotate(90)">
            Rotate +90deg
          </a>
          <a href="#" role="button" @click.prevent="rotate(-90)">
            Rotate -90deg
          </a>
          <a ref="flipX" href="#" role="button" @click.prevent="flipXFn">
            Flip X
          </a>
          <a ref="flipY" href="#" role="button" @click.prevent="flipYFn">
            Flip Y
          </a>
          <a href="#" role="button" @click.prevent="cropImage"> Crop </a>
          <a href="#" role="button" @click.prevent="reset"> Reset </a>
          <a href="#" role="button" @click.prevent="getData"> Get Data </a>
          <a href="#" role="button" @click.prevent="setData"> Set Data </a>
          <a href="#" role="button" @click.prevent="getCropBoxData">
            Get CropBox Data
          </a>
          <a href="#" role="button" @click.prevent="setCropBoxData">
            Set CropBox Data
          </a>
          <a href="#" role="button" @click.prevent="showFileChooser">
            Upload Image
          </a>
        </div>

        <textarea v-model="data" />
      </section>
      <section class="preview-area">
        <p>Preview</p>
        <div class="preview" />
        <p>Cropped Image</p>
        <div class="cropped-image">
          <img v-if="cropImg" :src="cropImg" alt="Cropped Image" />
          <div v-else class="crop-placeholder" />
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
<script lang="ts">
export default {
  name: 'UploadCrop'
}
</script>
