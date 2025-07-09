# Modern Animation System Guide

Bu rehber, portföy sitemde uygulanan modern ve responsive animasyon sistemini açıklar.

## 🎯 Genel Bakış

Animasyon sistemi şu özellikleri içerir:
- **Scroll-triggered animations** (Kaydırma tetiklemeli animasyonlar)
- **Responsive behavior** (Responsive davranış)
- **Performance optimized** (Performans optimizasyonu)
- **Accessibility support** (Erişilebilirlik desteği)
- **Smooth transitions** (Yumuşak geçişler)

## 🚀 Yeni Özellikler

### 1. CSS Animasyon Sınıfları

```css
/* Temel animasyon sınıfları */
.animate-fade-in-up
.animate-fade-in-down
.animate-fade-in-left
.animate-fade-in-right
.animate-scale-in
.animate-slide-in-bottom

/* Hover animasyonları */
.hover-lift
.hover-scale
.hover-glow

/* Stagger animasyonları */
.stagger-container
```

### 2. Custom Hook'lar

#### `useScrollAnimation`
```typescript
const { ref, isVisible, variants } = useScrollAnimation({
  direction: 'up',
  distance: 50,
  duration: 0.8,
  delay: 0.2,
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});
```

#### `useStaggerAnimation`
```typescript
const { ref, isVisible, getItemVariants } = useStaggerAnimation(items.length, {
  direction: 'up',
  distance: 30,
  duration: 0.7,
  baseDelay: 0.1
});
```

#### `useResponsiveAnimation`
```typescript
const { ref, isVisible, variants } = useResponsiveAnimation({
  direction: 'up',
  distance: 50,
  mobileDistance: 30,
  mobileDuration: 0.6
});
```

### 3. Bileşen Bileşenleri

#### `AnimatedSection`
```tsx
<AnimatedSection
  direction="up"
  distance={50}
  delay={0.2}
  duration={0.8}
>
  <h2>Başlık</h2>
</AnimatedSection>
```

#### `StaggerContainer`
```tsx
<StaggerContainer
  staggerDelay={0.1}
  direction="up"
  distance={30}
>
  <div>Öğe 1</div>
  <div>Öğe 2</div>
  <div>Öğe 3</div>
</StaggerContainer>
```

## 📱 Responsive Davranış

### Mobil Optimizasyonları
- Animasyon mesafeleri %40 azaltılır
- Animasyon süreleri %20 kısaltılır
- Gecikme süreleri %50 azaltılır

### Erişilebilirlik
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 🎨 Animasyon Türleri

### 1. Fade Animasyonları
- **fade-in-up**: Aşağıdan yukarı doğru belirme
- **fade-in-down**: Yukarıdan aşağı doğru belirme
- **fade-in-left**: Sağdan sola doğru belirme
- **fade-in-right**: Soldan sağa doğru belirme

### 2. Scale Animasyonları
- **scale-in**: Küçükten büyüğe doğru ölçekleme
- **hover-scale**: Hover'da büyütme

### 3. Transform Animasyonları
- **slide-in-bottom**: Alttan kaydırma
- **hover-lift**: Hover'da yukarı kaldırma

## 🔧 Kullanım Örnekleri

### Basit Animasyon
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "0px 0px -100px 0px" }}
  transition={{ 
    delay: 0.2, 
    type: "spring", 
    stiffness: 120,
    damping: 20
  }}
>
  İçerik
</motion.div>
```

### Stagger Animasyon
```tsx
const { ref, isVisible, getItemVariants } = useStaggerAnimation(items.length, {
  direction: 'up',
  distance: 40,
  duration: 0.8,
  baseDelay: 0.15
});

<div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-10">
  {items.map((item, index) => (
    <motion.div
      key={item.id}
      variants={getItemVariants(index)}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      whileHover={{ scale: 1.06 }}
      className="hover-lift"
    >
      {item.content}
    </motion.div>
  ))}
</div>
```

## ⚡ Performans Optimizasyonları

### 1. Intersection Observer
- Sadece görünür öğeler animasyon yapar
- Gereksiz hesaplamaları önler

### 2. CSS Transform
- GPU hızlandırması kullanır
- Layout thrashing'i önler

### 3. Debounced Resize
- Pencere boyutu değişikliklerinde performans optimizasyonu

## 🎯 Best Practices

### 1. Animasyon Süreleri
- **Kısa animasyonlar**: 0.3s - 0.6s
- **Orta animasyonlar**: 0.6s - 0.8s
- **Uzun animasyonlar**: 0.8s - 1.2s

### 2. Easing Fonksiyonları
```css
/* Yumuşak başlangıç ve bitiş */
cubic-bezier(0.4, 0, 0.2, 1)

/* Bounce efekti */
cubic-bezier(0.34, 1.56, 0.64, 1)
```

### 3. Threshold Değerleri
- **Erken tetikleme**: 0.1
- **Orta tetikleme**: 0.3
- **Geç tetikleme**: 0.5

## 🔄 Güncelleme Geçmişi

### v2.0 (Mevcut)
- ✅ Modern CSS animasyonları
- ✅ Custom hook'lar
- ✅ Responsive davranış
- ✅ Erişilebilirlik desteği
- ✅ Performance optimizasyonları

### v1.0 (Önceki)
- ❌ Sadece temel Framer Motion
- ❌ Responsive değil
- ❌ Performance sorunları

## 📝 Notlar

1. **Viewport Margin**: Animasyonların ne zaman tetikleneceğini kontrol eder
2. **Damping**: Spring animasyonlarının sönümleme miktarını belirler
3. **Stiffness**: Spring animasyonlarının sertliğini belirler
4. **Threshold**: Öğenin ne kadarının görünür olması gerektiğini belirler

Bu sistem, modern web standartlarına uygun, performanslı ve kullanıcı dostu animasyonlar sağlar. 