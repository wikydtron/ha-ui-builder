// ============================================================
// Mock HA Environment — Standalone entity set for preview rendering
// Uses the shared HAEntity type from src/types
// ============================================================

import type { HAEntity } from '../types';

export const mockEntities: HAEntity[] = [
  // ──────────────────────────────────────────────────────────
  // LIGHTS (10)
  // ──────────────────────────────────────────────────────────
  {
    entity_id: 'light.living_room',
    friendly_name: 'Living Room Light',
    state: 'on',
    domain: 'light',
    attributes: {
      brightness: 200,
      color_temp: 370,
      supported_color_modes: ['color_temp', 'xy'],
      color_mode: 'color_temp',
      friendly_name: 'Living Room Light',
      icon: 'mdi:ceiling-light',
    },
  },
  {
    entity_id: 'light.bedroom',
    friendly_name: 'Bedroom Light',
    state: 'off',
    domain: 'light',
    attributes: {
      brightness: 0,
      supported_color_modes: ['color_temp', 'xy'],
      friendly_name: 'Bedroom Light',
    },
  },
  {
    entity_id: 'light.kitchen',
    friendly_name: 'Kitchen Light',
    state: 'on',
    domain: 'light',
    attributes: {
      brightness: 255,
      color_temp: 300,
      supported_color_modes: ['color_temp'],
      color_mode: 'color_temp',
      friendly_name: 'Kitchen Light',
    },
  },
  {
    entity_id: 'light.office',
    friendly_name: 'Office Light',
    state: 'on',
    domain: 'light',
    attributes: {
      brightness: 230,
      color_temp: 250,
      supported_color_modes: ['color_temp'],
      color_mode: 'color_temp',
      friendly_name: 'Office Light',
    },
  },
  {
    entity_id: 'light.bathroom',
    friendly_name: 'Bathroom Light',
    state: 'off',
    domain: 'light',
    attributes: {
      brightness: 0,
      supported_color_modes: ['brightness'],
      friendly_name: 'Bathroom Light',
    },
  },
  {
    entity_id: 'light.hallway',
    friendly_name: 'Hallway Light',
    state: 'off',
    domain: 'light',
    attributes: {
      brightness: 0,
      supported_color_modes: ['brightness'],
      friendly_name: 'Hallway Light',
    },
  },
  {
    entity_id: 'light.garage',
    friendly_name: 'Garage Light',
    state: 'off',
    domain: 'light',
    attributes: {
      brightness: 0,
      supported_color_modes: ['brightness'],
      friendly_name: 'Garage Light',
    },
  },
  {
    entity_id: 'light.porch',
    friendly_name: 'Porch Light',
    state: 'on',
    domain: 'light',
    attributes: {
      brightness: 180,
      supported_color_modes: ['brightness'],
      color_mode: 'brightness',
      friendly_name: 'Porch Light',
      icon: 'mdi:coach-lamp',
    },
  },
  {
    entity_id: 'light.dining_room',
    friendly_name: 'Dining Room Light',
    state: 'off',
    domain: 'light',
    attributes: {
      brightness: 0,
      supported_color_modes: ['color_temp'],
      friendly_name: 'Dining Room Light',
    },
  },
  {
    entity_id: 'light.entry',
    friendly_name: 'Entry Light',
    state: 'on',
    domain: 'light',
    attributes: {
      brightness: 150,
      supported_color_modes: ['brightness'],
      color_mode: 'brightness',
      friendly_name: 'Entry Light',
    },
  },

  // ──────────────────────────────────────────────────────────
  // SENSORS (8)
  // ──────────────────────────────────────────────────────────
  {
    entity_id: 'sensor.temperature_living',
    friendly_name: 'Living Room Temperature',
    state: '21.5',
    domain: 'sensor',
    attributes: {
      unit_of_measurement: '°C',
      device_class: 'temperature',
      state_class: 'measurement',
      friendly_name: 'Living Room Temperature',
    },
  },
  {
    entity_id: 'sensor.humidity_living',
    friendly_name: 'Living Room Humidity',
    state: '48',
    domain: 'sensor',
    attributes: {
      unit_of_measurement: '%',
      device_class: 'humidity',
      state_class: 'measurement',
      friendly_name: 'Living Room Humidity',
    },
  },
  {
    entity_id: 'sensor.temperature_bedroom',
    friendly_name: 'Bedroom Temperature',
    state: '19.2',
    domain: 'sensor',
    attributes: {
      unit_of_measurement: '°C',
      device_class: 'temperature',
      state_class: 'measurement',
      friendly_name: 'Bedroom Temperature',
    },
  },
  {
    entity_id: 'sensor.energy_daily',
    friendly_name: 'Daily Energy',
    state: '12.4',
    domain: 'sensor',
    attributes: {
      unit_of_measurement: 'kWh',
      device_class: 'energy',
      state_class: 'total_increasing',
      friendly_name: 'Daily Energy',
      icon: 'mdi:lightning-bolt',
    },
  },
  {
    entity_id: 'sensor.solar_power',
    friendly_name: 'Solar Power',
    state: '2340',
    domain: 'sensor',
    attributes: {
      unit_of_measurement: 'W',
      device_class: 'power',
      state_class: 'measurement',
      friendly_name: 'Solar Power',
      icon: 'mdi:solar-power',
    },
  },
  {
    entity_id: 'sensor.grid_power',
    friendly_name: 'Grid Power',
    state: '450',
    domain: 'sensor',
    attributes: {
      unit_of_measurement: 'W',
      device_class: 'power',
      state_class: 'measurement',
      friendly_name: 'Grid Power',
      icon: 'mdi:transmission-tower',
    },
  },
  {
    entity_id: 'sensor.battery_level',
    friendly_name: 'Home Battery',
    state: '78',
    domain: 'sensor',
    attributes: {
      unit_of_measurement: '%',
      device_class: 'battery',
      state_class: 'measurement',
      friendly_name: 'Home Battery',
    },
  },
  {
    entity_id: 'sensor.co2_living',
    friendly_name: 'Living Room CO2',
    state: '412',
    domain: 'sensor',
    attributes: {
      unit_of_measurement: 'ppm',
      device_class: 'carbon_dioxide',
      state_class: 'measurement',
      friendly_name: 'Living Room CO2',
      icon: 'mdi:molecule-co2',
    },
  },

  // ──────────────────────────────────────────────────────────
  // SWITCHES (6)
  // ──────────────────────────────────────────────────────────
  {
    entity_id: 'switch.coffee_maker',
    friendly_name: 'Coffee Maker',
    state: 'off',
    domain: 'switch',
    attributes: { friendly_name: 'Coffee Maker', icon: 'mdi:coffee-maker' },
  },
  {
    entity_id: 'switch.tv',
    friendly_name: 'TV',
    state: 'on',
    domain: 'switch',
    attributes: { friendly_name: 'TV', icon: 'mdi:television' },
  },
  {
    entity_id: 'switch.fan',
    friendly_name: 'Fan',
    state: 'off',
    domain: 'switch',
    attributes: { friendly_name: 'Fan', icon: 'mdi:fan' },
  },
  {
    entity_id: 'switch.dishwasher',
    friendly_name: 'Dishwasher',
    state: 'off',
    domain: 'switch',
    attributes: { friendly_name: 'Dishwasher', icon: 'mdi:dishwasher' },
  },
  {
    entity_id: 'switch.outdoor_lights',
    friendly_name: 'Outdoor Lights',
    state: 'on',
    domain: 'switch',
    attributes: { friendly_name: 'Outdoor Lights', icon: 'mdi:outdoor-lamp' },
  },
  {
    entity_id: 'switch.irrigation',
    friendly_name: 'Irrigation',
    state: 'off',
    domain: 'switch',
    attributes: { friendly_name: 'Irrigation', icon: 'mdi:sprinkler' },
  },

  // ──────────────────────────────────────────────────────────
  // BINARY SENSORS (4)
  // ──────────────────────────────────────────────────────────
  {
    entity_id: 'binary_sensor.motion_living',
    friendly_name: 'Living Room Motion',
    state: 'off',
    domain: 'binary_sensor',
    attributes: { device_class: 'motion', friendly_name: 'Living Room Motion' },
  },
  {
    entity_id: 'binary_sensor.door_front',
    friendly_name: 'Front Door',
    state: 'off',
    domain: 'binary_sensor',
    attributes: { device_class: 'door', friendly_name: 'Front Door' },
  },
  {
    entity_id: 'binary_sensor.window_kitchen',
    friendly_name: 'Kitchen Window',
    state: 'off',
    domain: 'binary_sensor',
    attributes: { device_class: 'window', friendly_name: 'Kitchen Window' },
  },
  {
    entity_id: 'binary_sensor.smoke_kitchen',
    friendly_name: 'Kitchen Smoke Detector',
    state: 'off',
    domain: 'binary_sensor',
    attributes: { device_class: 'smoke', friendly_name: 'Kitchen Smoke Detector' },
  },

  // ──────────────────────────────────────────────────────────
  // CLIMATE (3)
  // ──────────────────────────────────────────────────────────
  {
    entity_id: 'climate.living_room',
    friendly_name: 'Living Room Thermostat',
    state: 'heat',
    domain: 'climate',
    attributes: {
      temperature: 21,
      current_temperature: 20.5,
      hvac_modes: ['heat', 'cool', 'heat_cool', 'off'],
      hvac_action: 'heating',
      preset_mode: 'home',
      preset_modes: ['home', 'away', 'sleep'],
      friendly_name: 'Living Room Thermostat',
    },
  },
  {
    entity_id: 'climate.bedroom',
    friendly_name: 'Bedroom Thermostat',
    state: 'off',
    domain: 'climate',
    attributes: {
      temperature: 18,
      current_temperature: 19.2,
      hvac_modes: ['heat', 'cool', 'off'],
      hvac_action: 'off',
      friendly_name: 'Bedroom Thermostat',
    },
  },
  {
    entity_id: 'climate.office',
    friendly_name: 'Office Climate',
    state: 'cool',
    domain: 'climate',
    attributes: {
      temperature: 22,
      current_temperature: 23.1,
      hvac_modes: ['heat', 'cool', 'dry', 'fan_only', 'off'],
      hvac_action: 'cooling',
      friendly_name: 'Office Climate',
    },
  },

  // ──────────────────────────────────────────────────────────
  // MEDIA PLAYERS (3)
  // ──────────────────────────────────────────────────────────
  {
    entity_id: 'media_player.living_room_tv',
    friendly_name: 'Living Room TV',
    state: 'playing',
    domain: 'media_player',
    attributes: {
      media_title: 'Inception',
      media_content_type: 'movie',
      source: 'Netflix',
      source_list: ['Netflix', 'YouTube', 'Disney+', 'Plex', 'HDMI 1'],
      volume_level: 0.4,
      is_volume_muted: false,
      supported_features: 152463,
      friendly_name: 'Living Room TV',
      icon: 'mdi:television',
    },
  },
  {
    entity_id: 'media_player.bedroom_speaker',
    friendly_name: 'Bedroom Speaker',
    state: 'idle',
    domain: 'media_player',
    attributes: {
      volume_level: 0.3,
      is_volume_muted: false,
      supported_features: 21437,
      friendly_name: 'Bedroom Speaker',
      icon: 'mdi:speaker',
    },
  },
  {
    entity_id: 'media_player.kitchen_display',
    friendly_name: 'Kitchen Display',
    state: 'off',
    domain: 'media_player',
    attributes: {
      supported_features: 21437,
      friendly_name: 'Kitchen Display',
      icon: 'mdi:tablet',
    },
  },

  // ──────────────────────────────────────────────────────────
  // COVERS (2)
  // ──────────────────────────────────────────────────────────
  {
    entity_id: 'cover.garage_door',
    friendly_name: 'Garage Door',
    state: 'closed',
    domain: 'cover',
    attributes: {
      device_class: 'garage',
      supported_features: 3,
      friendly_name: 'Garage Door',
    },
  },
  {
    entity_id: 'cover.living_room_blinds',
    friendly_name: 'Living Room Blinds',
    state: 'open',
    domain: 'cover',
    attributes: {
      current_position: 80,
      device_class: 'blind',
      supported_features: 15,
      friendly_name: 'Living Room Blinds',
    },
  },

  // ──────────────────────────────────────────────────────────
  // WEATHER
  // ──────────────────────────────────────────────────────────
  {
    entity_id: 'weather.home',
    friendly_name: 'Home',
    state: 'sunny',
    domain: 'weather',
    attributes: {
      temperature: 22,
      temperature_unit: '°C',
      humidity: 55,
      wind_speed: 12,
      wind_speed_unit: 'km/h',
      pressure: 1013,
      pressure_unit: 'hPa',
      forecast: [
        { datetime: '2026-03-14', condition: 'partlycloudy', temperature: 20, templow: 14 },
        { datetime: '2026-03-15', condition: 'rainy', temperature: 18, templow: 12 },
        { datetime: '2026-03-16', condition: 'sunny', temperature: 24, templow: 15 },
      ],
      friendly_name: 'Home',
    },
  },

  // ──────────────────────────────────────────────────────────
  // PERSON, ALARM, INPUT_BOOLEAN, INPUT_NUMBER
  // ──────────────────────────────────────────────────────────
  {
    entity_id: 'person.frank',
    friendly_name: 'Frank',
    state: 'home',
    domain: 'person',
    attributes: {
      editable: true,
      id: 'frank',
      source: 'device_tracker.frank_phone',
      friendly_name: 'Frank',
    },
  },
  {
    entity_id: 'alarm_control_panel.home',
    friendly_name: 'Home Alarm',
    state: 'disarmed',
    domain: 'alarm_control_panel',
    attributes: {
      code_format: 'number',
      supported_features: 63,
      friendly_name: 'Home Alarm',
    },
  },
  {
    entity_id: 'input_boolean.guest_mode',
    friendly_name: 'Guest Mode',
    state: 'off',
    domain: 'input_boolean',
    attributes: { friendly_name: 'Guest Mode', icon: 'mdi:account-group' },
  },
  {
    entity_id: 'input_number.target_temp',
    friendly_name: 'Target Temperature',
    state: '21',
    domain: 'input_number',
    attributes: {
      min: 15,
      max: 28,
      step: 0.5,
      mode: 'slider',
      unit_of_measurement: '°C',
      friendly_name: 'Target Temperature',
      icon: 'mdi:thermometer',
    },
  },
];

// ============================================================
// Helper Functions
// ============================================================

export function getMockState(entityId: string): HAEntity | undefined {
  return mockEntities.find((e) => e.entity_id === entityId);
}

export function getMockFriendlyName(entityId: string): string {
  const entity = mockEntities.find((e) => e.entity_id === entityId);
  return entity?.friendly_name ?? entityId.replace(/^\w+\./, '').replace(/_/g, ' ');
}
