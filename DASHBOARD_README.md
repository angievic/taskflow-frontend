# Dashboard de Productividad Personal - Frontend

## Descripción

Este dashboard de productividad personal proporciona una interfaz completa para visualizar y analizar métricas de productividad, incluyendo gráficos de tareas completadas, distribución de prioridades, tiempo dedicado por proyecto y actividades recientes.

## Características Implementadas

### 🎯 Componentes Principales

1. **MetricsCard**: Muestra métricas generales de productividad
   - Total de tareas
   - Tareas completadas, en progreso y pendientes
   - Tasa de finalización
   - Proyectos activos

2. **TaskCompletionChart**: Gráfico de líneas que muestra tendencias de tareas completadas
   - Visualización de los últimos 30 días
   - Línea interactiva con tooltips
   - Estadísticas resumidas

3. **PriorityChart**: Distribución de tareas por prioridad
   - Barras horizontales con porcentajes
   - Colores diferenciados por prioridad
   - Estadísticas de resumen

4. **TimeSpentChart**: Tiempo dedicado por proyecto
   - Barras proporcionales al tiempo invertido
   - Información de cantidad de tareas por proyecto
   - Estadísticas de proyecto más activo

5. **RecentActivities**: Lista de actividades recientes
   - Iconos diferenciados por tipo de actividad
   - Timestamps formateados
   - Diseño tipo timeline

### 🔧 Servicios y Hooks

1. **dashboardService**: Servicio para consumir los endpoints del backend
   - Métodos para obtener métricas completas
   - Funciones específicas para cada tipo de dato
   - Manejo de parámetros opcionales

2. **useDashboard**: Hook personalizado para manejo de estado
   - Estado de loading, error y datos
   - Función de refresh
   - Manejo automático de errores

### 🛡️ Manejo de Errores

1. **ErrorBoundary**: Componente para capturar errores de React
   - Manejo de errores inesperados
   - Información detallada de errores
   - Botón de recuperación

2. **Estados de Error**: Manejo granular de errores
   - Errores de red
   - Errores de parsing
   - Estados de carga fallidos

### 📱 Diseño Responsive

- **Grid Layout**: Sistema de grid CSS responsivo
- **Breakpoints**: Adaptación para móviles, tablets y desktop
- **Componentes Flexibles**: Todos los componentes se adaptan al tamaño de pantalla

### 🎨 Características de UX

1. **Loading States**: Estados de carga con skeletons
2. **Hover Effects**: Efectos interactivos en tarjetas y botones
3. **Animations**: Animaciones sutiles para mejor experiencia
4. **Color Coding**: Colores consistentes para diferentes tipos de datos
5. **Iconos**: Iconos emoji para mejor reconocimiento visual

## Estructura de Archivos

```
src/
├── components/
│   ├── MetricsCard.tsx/css
│   ├── TaskCompletionChart.tsx/css
│   ├── PriorityChart.tsx/css
│   ├── TimeSpentChart.tsx/css
│   ├── RecentActivities.tsx/css
│   ├── ErrorBoundary.tsx/css
│   └── LoadingSpinner.tsx/css
├── hooks/
│   └── useDashboard.ts
├── pages/
│   ├── ProductivityDashboard.tsx/css
│   └── DashboardPage.tsx (actualizado)
├── services/
│   └── dashboardService.ts
└── types/
    └── index.ts (tipos extendidos)
```

## Endpoints del Backend Utilizados

El dashboard consume los siguientes endpoints (esperados):

```
GET /api/v1/dashboard/productivity       # Datos completos del dashboard
GET /api/v1/dashboard/metrics           # Métricas de productividad
GET /api/v1/dashboard/task-completion-trend?days=30  # Tendencia de tareas
GET /api/v1/dashboard/time-spent-by-project         # Tiempo por proyecto
GET /api/v1/dashboard/priority-distribution         # Distribución de prioridades
GET /api/v1/dashboard/weekly-progress?weeks=8       # Progreso semanal
GET /api/v1/dashboard/recent-activities?limit=10    # Actividades recientes
```

## Tipos de Datos

### ProductivityMetrics
```typescript
interface ProductivityMetrics {
  total_tasks: number;
  completed_tasks: number;
  pending_tasks: number;
  in_progress_tasks: number;
  completion_rate: number;
  total_projects: number;
  active_projects: number;
  average_completion_time: number;
}
```

### TaskCompletionData
```typescript
interface TaskCompletionData {
  date: string;
  completed_tasks: number;
}
```

### TimeSpentData
```typescript
interface TimeSpentData {
  project_name: string;
  total_time: number;  // en minutos
  task_count: number;
}
```

### PriorityDistribution
```typescript
interface PriorityDistribution {
  priority: "low" | "medium" | "high";
  count: number;
  percentage: number;
}
```

### RecentActivity
```typescript
interface RecentActivity {
  id: number;
  type: "task_created" | "task_completed" | "project_created";
  description: string;
  timestamp: string;
  related_object_id: number;
  related_object_type: "task" | "project";
}
```

## Uso

### Navegación entre Dashboards

El componente `DashboardPage` ahora incluye un toggle para cambiar entre:
- **Simple Dashboard**: Vista básica original
- **Productivity Dashboard**: Nueva vista avanzada (por defecto)

### Refresh de Datos

- Botón de refresh manual
- Indicador de última actualización
- Estados de loading durante refresh

### Manejo de Errores

- Error boundaries para capturar errores inesperados
- Mensajes de error específicos para problemas de red
- Botones de reintento en casos de error

## Personalización

### Colores y Temas

Los colores se pueden personalizar modificando las variables CSS en cada archivo de estilos. Los colores principales son:

- **Primary**: `#4f46e5` (índigo)
- **Success**: `#10b981` (verde)
- **Warning**: `#f59e0b` (ámbar)
- **Error**: `#ef4444` (rojo)
- **Gray Scale**: Varios tonos de gris para texto y fondos

### Métricas Adicionales

Para agregar nuevas métricas:

1. Actualizar los tipos en `types/index.ts`
2. Agregar el endpoint en `dashboardService.ts`
3. Crear el componente de visualización
4. Integrarlo en `ProductivityDashboard.tsx`

## Mejores Prácticas Implementadas

1. **Separation of Concerns**: Servicios, hooks y componentes separados
2. **Error Handling**: Manejo robusto de errores en múltiples niveles
3. **TypeScript**: Tipado fuerte para mayor confiabilidad
4. **Responsive Design**: Diseño que funciona en todos los dispositivos
5. **Performance**: Componentes optimizados con loading states
6. **Accessibility**: Estructura semántica y contraste adecuado
7. **User Experience**: Estados de loading, errores informativos y feedback visual

## Instalación y Configuración

No se requieren dependencias adicionales. El dashboard utiliza únicamente las dependencias ya existentes en el proyecto:

- React 19+
- TypeScript
- CSS Modules
- Axios para peticiones HTTP

El dashboard es completamente funcional y listo para usar una vez que el backend implemente los endpoints correspondientes.
