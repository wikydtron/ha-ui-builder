// ============================================================
// Fake Entity Database for HA Dashboard Builder
// Realistic smart home entities across all major domains
// ============================================================

import type { HAEntity } from '../types';

export const fakeEntities: HAEntity[] = [
  // ──────────────────────────────────────────────────────────
  // LIGHTS
  // ──────────────────────────────────────────────────────────
  {
    entity_id: 'light.living_room_main',
    friendly_name: 'Living Room Main Light',
    state: 'on',
    domain: 'light',
    attributes: {
      brightness: 255,
      color_temp: 370,
      min_mireds: 153,
      max_mireds: 500,
      supported_color_modes: ['color_temp', 'xy'],
      color_mode: 'color_temp',
      friendly_name: 'Living Room Main Light',
      icon: 'mdi:ceiling-light',
    },
  },
  {
    entity_id: 'light.living_room_lamp',
    friendly_name: 'Living Room Floor Lamp',
    state: 'on',
    domain: 'light',
    attributes: {
      brightness: 140,
      color_temp: 420,
      supported_color_modes: ['color_temp'],
      color_mode: 'color_temp',
      friendly_name: 'Living Room Floor Lamp',
      icon: 'mdi:floor-lamp',
    },
  },
  {
    entity_id: 'light.kitchen_overhead',
    friendly_name: 'Kitchen Overhead Light',
    state: 'on',
    domain: 'light',
    attributes: {
      brightness: 255,
      color_temp: 300,
      supported_color_modes: ['color_temp'],
      color_mode: 'color_temp',
      friendly_name: 'Kitchen Overhead Light',
    },
  },
  {
    entity_id: 'light.kitchen_under_cabinet',
    friendly_name: 'Kitchen Under Cabinet Lights',
    state: 'off',
    domain: 'light',
    attributes: {
      brightness: 0,
      supported_color_modes: ['brightness'],
      friendly_name: 'Kitchen Under Cabinet Lights',
      icon: 'mdi:led-strip-variant',
    },
  },
  {
    entity_id: 'light.master_bedroom',
    friendly_name: 'Master Bedroom Light',
    state: 'off',
    domain: 'light',
    attributes: {
      brightness: 0,
      color_temp: 400,
      supported_color_modes: ['color_temp', 'xy'],
      friendly_name: 'Master Bedroom Light',
    },
  },
  {
    entity_id: 'light.master_bedroom_nightstand_left',
    friendly_name: 'Left Nightstand Lamp',
    state: 'on',
    domain: 'light',
    attributes: {
      brightness: 50,
      rgb_color: [255, 180, 107],
      supported_color_modes: ['color_temp', 'xy'],
      color_mode: 'xy',
      friendly_name: 'Left Nightstand Lamp',
    },
  },
  {
    entity_id: 'light.master_bedroom_nightstand_right',
    friendly_name: 'Right Nightstand Lamp',
    state: 'off',
    domain: 'light',
    attributes: {
      brightness: 0,
      supported_color_modes: ['color_temp', 'xy'],
      friendly_name: 'Right Nightstand Lamp',
    },
  },
  {
    entity_id: 'light.kids_bedroom',
    friendly_name: 'Kids Bedroom Light',
    state: 'off',
    domain: 'light',
    attributes: {
      brightness: 0,
      supported_color_modes: ['brightness'],
      friendly_name: 'Kids Bedroom Light',
    },
  },
  {
    entity_id: 'light.bathroom_vanity',
    friendly_name: 'Bathroom Vanity Light',
    state: 'on',
    domain: 'light',
    attributes: {
      brightness: 200,
      color_temp: 280,
      supported_color_modes: ['color_temp'],
      color_mode: 'color_temp',
      friendly_name: 'Bathroom Vanity Light',
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
    entity_id: 'light.front_porch',
    friendly_name: 'Front Porch Light',
    state: 'on',
    domain: 'light',
    attributes: {
      brightness: 180,
      supported_color_modes: ['brightness'],
      color_mode: 'brightness',
      friendly_name: 'Front Porch Light',
      icon: 'mdi:coach-lamp',
    },
  },
  {
    entity_id: 'light.backyard_patio',
    friendly_name: 'Backyard Patio Lights',
    state: 'off',
    domain: 'light',
    attributes: {
      brightness: 0,
      supported_color_modes: ['brightness'],
      friendly_name: 'Backyard Patio Lights',
      icon: 'mdi:string-lights',
    },
  },
  {
    entity_id: 'light.office_desk',
    friendly_name: 'Office Desk Lamp',
    state: 'on',
    domain: 'light',
    attributes: {
      brightness: 230,
      color_temp: 250,
      supported_color_modes: ['color_temp'],
      color_mode: 'color_temp',
      friendly_name: 'Office Desk Lamp',
    },
  },

  // ──────────────────────────────────────────────────────────
  // SWITCHES
  // ──────────────────────────────────────────────────────────
  {
    entity_id: 'switch.living_room_outlet',
    friendly_name: 'Living Room Smart Outlet',
    state: 'on',
    domain: 'switch',
    attributes: { friendly_name: 'Living Room Smart Outlet', icon: 'mdi:power-socket-us' },
  },
  {
    entity_id: 'switch.coffee_maker',
    friendly_name: 'Coffee Maker',
    state: 'off',
    domain: 'switch',
    attributes: { friendly_name: 'Coffee Maker', icon: 'mdi:coffee-maker' },
  },
  {
    entity_id: 'switch.christmas_tree',
    friendly_name: 'Christmas Tree',
    state: 'off',
    domain: 'switch',
    attributes: { friendly_name: 'Christmas Tree', icon: 'mdi:pine-tree' },
  },
  {
    entity_id: 'switch.garage_heater',
    friendly_name: 'Garage Heater',
    state: 'off',
    domain: 'switch',
    attributes: { friendly_name: 'Garage Heater', icon: 'mdi:radiator', current_power_w: 0 },
  },
  {
    entity_id: 'switch.office_monitor_power',
    friendly_name: 'Office Monitor Power Strip',
    state: 'on',
    domain: 'switch',
    attributes: { friendly_name: 'Office Monitor Power Strip', current_power_w: 85.3 },
  },

  // ──────────────────────────────────────────────────────────
  // SENSORS
  // ──────────────────────────────────────────────────────────
  {
    entity_id: 'sensor.living_room_temperature',
    friendly_name: 'Living Room Temperature',
    state: '72.4',
    domain: 'sensor',
    attributes: {
      unit_of_measurement: '°F',
      device_class: 'temperature',
      state_class: 'measurement',
      friendly_name: 'Living Room Temperature',
    },
  },
  {
    entity_id: 'sensor.living_room_humidity',
    friendly_name: 'Living Room Humidity',
    state: '45',
    domain: 'sensor',
    attributes: {
      unit_of_measurement: '%',
      device_class: 'humidity',
      state_class: 'measurement',
      friendly_name: 'Living Room Humidity',
    },
  },
  {
    entity_id: 'sensor.outdoor_temperature',
    friendly_name: 'Outdoor Temperature',
    state: '38.2',
    domain: 'sensor',
    attributes: {
      unit_of_measurement: '°F',
      device_class: 'temperature',
      state_class: 'measurement',
      friendly_name: 'Outdoor Temperature',
    },
  },
  {
    entity_id: 'sensor.outdoor_humidity',
    friendly_name: 'Outdoor Humidity',
    state: '62',
    domain: 'sensor',
    attributes: {
      unit_of_measurement: '%',
      device_class: 'humidity',
      state_class: 'measurement',
      friendly_name: 'Outdoor Humidity',
    },
  },
  {
    entity_id: 'sensor.kitchen_temperature',
    friendly_name: 'Kitchen Temperature',
    state: '74.1',
    domain: 'sensor',
    attributes: {
      unit_of_measurement: '°F',
      device_class: 'temperature',
      state_class: 'measurement',
      friendly_name: 'Kitchen Temperature',
    },
  },
  {
    entity_id: 'sensor.master_bedroom_temperature',
    friendly_name: 'Master Bedroom Temperature',
    state: '69.8',
    domain: 'sensor',
    attributes: {
      unit_of_measurement: '°F',
      device_class: 'temperature',
      state_class: 'measurement',
      friendly_name: 'Master Bedroom Temperature',
    },
  },
  {
    entity_id: 'sensor.energy_daily',
    friendly_name: 'Daily Energy Consumption',
    state: '18.7',
    domain: 'sensor',
    attributes: {
      unit_of_measurement: 'kWh',
      device_class: 'energy',
      state_class: 'total_increasing',
      friendly_name: 'Daily Energy Consumption',
      icon: 'mdi:lightning-bolt',
    },
  },
  {
    entity_id: 'sensor.power_consumption',
    friendly_name: 'Current Power Usage',
    state: '1284',
    domain: 'sensor',
    attributes: {
      unit_of_measurement: 'W',
      device_class: 'power',
      state_class: 'measurement',
      friendly_name: 'Current Power Usage',
    },
  },
  {
    entity_id: 'sensor.solar_power',
    friendly_name: 'Solar Panel Output',
    state: '2450',
    domain: 'sensor',
    attributes: {
      unit_of_measurement: 'W',
      device_class: 'power',
      state_class: 'measurement',
      friendly_name: 'Solar Panel Output',
      icon: 'mdi:solar-power',
    },
  },
  {
    entity_id: 'sensor.washing_machine_power',
    friendly_name: 'Washing Machine Power',
    state: '3.2',
    domain: 'sensor',
    attributes: {
      unit_of_measurement: 'W',
      device_class: 'power',
      state_class: 'measurement',
      friendly_name: 'Washing Machine Power',
    },
  },
  {
    entity_id: 'sensor.front_door_battery',
    friendly_name: 'Front Door Sensor Battery',
    state: '87',
    domain: 'sensor',
    attributes: {
      unit_of_measurement: '%',
      device_class: 'battery',
      friendly_name: 'Front Door Sensor Battery',
    },
  },
  {
    entity_id: 'sensor.garage_door_battery',
    friendly_name: 'Garage Door Sensor Battery',
    state: '42',
    domain: 'sensor',
    attributes: {
      unit_of_measurement: '%',
      device_class: 'battery',
      friendly_name: 'Garage Door Sensor Battery',
      icon: 'mdi:battery-40',
    },
  },
  {
    entity_id: 'sensor.living_room_illuminance',
    friendly_name: 'Living Room Light Level',
    state: '320',
    domain: 'sensor',
    attributes: {
      unit_of_measurement: 'lx',
      device_class: 'illuminance',
      state_class: 'measurement',
      friendly_name: 'Living Room Light Level',
    },
  },
  {
    entity_id: 'sensor.air_quality_pm25',
    friendly_name: 'Indoor Air Quality PM2.5',
    state: '8',
    domain: 'sensor',
    attributes: {
      unit_of_measurement: 'µg/m³',
      device_class: 'pm25',
      state_class: 'measurement',
      friendly_name: 'Indoor Air Quality PM2.5',
    },
  },

  // ──────────────────────────────────────────────────────────
  // BINARY SENSORS
  // ──────────────────────────────────────────────────────────
  {
    entity_id: 'binary_sensor.front_door',
    friendly_name: 'Front Door',
    state: 'off',
    domain: 'binary_sensor',
    attributes: { device_class: 'door', friendly_name: 'Front Door' },
  },
  {
    entity_id: 'binary_sensor.back_door',
    friendly_name: 'Back Door',
    state: 'off',
    domain: 'binary_sensor',
    attributes: { device_class: 'door', friendly_name: 'Back Door' },
  },
  {
    entity_id: 'binary_sensor.garage_door',
    friendly_name: 'Garage Door',
    state: 'off',
    domain: 'binary_sensor',
    attributes: { device_class: 'garage_door', friendly_name: 'Garage Door' },
  },
  {
    entity_id: 'binary_sensor.living_room_motion',
    friendly_name: 'Living Room Motion',
    state: 'on',
    domain: 'binary_sensor',
    attributes: { device_class: 'motion', friendly_name: 'Living Room Motion' },
  },
  {
    entity_id: 'binary_sensor.kitchen_motion',
    friendly_name: 'Kitchen Motion',
    state: 'off',
    domain: 'binary_sensor',
    attributes: { device_class: 'motion', friendly_name: 'Kitchen Motion' },
  },
  {
    entity_id: 'binary_sensor.hallway_motion',
    friendly_name: 'Hallway Motion',
    state: 'off',
    domain: 'binary_sensor',
    attributes: { device_class: 'motion', friendly_name: 'Hallway Motion' },
  },
  {
    entity_id: 'binary_sensor.smoke_detector_kitchen',
    friendly_name: 'Kitchen Smoke Detector',
    state: 'off',
    domain: 'binary_sensor',
    attributes: { device_class: 'smoke', friendly_name: 'Kitchen Smoke Detector' },
  },
  {
    entity_id: 'binary_sensor.water_leak_basement',
    friendly_name: 'Basement Water Leak Sensor',
    state: 'off',
    domain: 'binary_sensor',
    attributes: { device_class: 'moisture', friendly_name: 'Basement Water Leak Sensor' },
  },
  {
    entity_id: 'binary_sensor.washing_machine',
    friendly_name: 'Washing Machine Running',
    state: 'off',
    domain: 'binary_sensor',
    attributes: { device_class: 'running', friendly_name: 'Washing Machine Running' },
  },

  // ──────────────────────────────────────────────────────────
  // MEDIA PLAYERS
  // ──────────────────────────────────────────────────────────
  {
    entity_id: 'media_player.living_room_tv',
    friendly_name: 'Living Room TV',
    state: 'playing',
    domain: 'media_player',
    attributes: {
      media_title: 'Breaking Bad',
      media_series_title: 'Breaking Bad',
      media_season: 3,
      media_episode: 7,
      media_content_type: 'tvshow',
      source: 'Netflix',
      source_list: ['Netflix', 'YouTube', 'Disney+', 'Plex', 'HDMI 1', 'HDMI 2'],
      volume_level: 0.35,
      is_volume_muted: false,
      supported_features: 152463,
      friendly_name: 'Living Room TV',
      icon: 'mdi:television',
    },
  },
  {
    entity_id: 'media_player.bedroom_tv',
    friendly_name: 'Bedroom TV',
    state: 'off',
    domain: 'media_player',
    attributes: {
      source_list: ['Netflix', 'YouTube', 'HBO Max', 'HDMI 1'],
      supported_features: 152463,
      friendly_name: 'Bedroom TV',
      icon: 'mdi:television',
    },
  },
  {
    entity_id: 'media_player.kitchen_speaker',
    friendly_name: 'Kitchen Speaker',
    state: 'playing',
    domain: 'media_player',
    attributes: {
      media_title: 'Blinding Lights',
      media_artist: 'The Weeknd',
      media_album_name: 'After Hours',
      media_content_type: 'music',
      volume_level: 0.22,
      is_volume_muted: false,
      supported_features: 21437,
      friendly_name: 'Kitchen Speaker',
      icon: 'mdi:speaker',
    },
  },
  {
    entity_id: 'media_player.office_speaker',
    friendly_name: 'Office Speaker',
    state: 'idle',
    domain: 'media_player',
    attributes: {
      volume_level: 0.3,
      is_volume_muted: false,
      supported_features: 21437,
      friendly_name: 'Office Speaker',
      icon: 'mdi:speaker',
    },
  },
  {
    entity_id: 'media_player.sonos_whole_home',
    friendly_name: 'Whole Home Audio',
    state: 'paused',
    domain: 'media_player',
    attributes: {
      media_title: 'Lo-Fi Beats',
      media_artist: 'Various Artists',
      media_content_type: 'music',
      volume_level: 0.15,
      group_members: [
        'media_player.kitchen_speaker',
        'media_player.office_speaker',
      ],
      supported_features: 21437,
      friendly_name: 'Whole Home Audio',
    },
  },

  // ──────────────────────────────────────────────────────────
  // CLIMATE
  // ──────────────────────────────────────────────────────────
  {
    entity_id: 'climate.living_room',
    friendly_name: 'Living Room Thermostat',
    state: 'heat',
    domain: 'climate',
    attributes: {
      temperature: 72,
      current_temperature: 70.3,
      target_temp_high: 76,
      target_temp_low: 68,
      hvac_modes: ['heat', 'cool', 'heat_cool', 'off'],
      hvac_action: 'heating',
      preset_mode: 'home',
      preset_modes: ['home', 'away', 'sleep'],
      fan_mode: 'auto',
      fan_modes: ['auto', 'low', 'high'],
      humidity: 45,
      friendly_name: 'Living Room Thermostat',
    },
  },
  {
    entity_id: 'climate.upstairs',
    friendly_name: 'Upstairs Thermostat',
    state: 'heat',
    domain: 'climate',
    attributes: {
      temperature: 70,
      current_temperature: 68.5,
      hvac_modes: ['heat', 'cool', 'heat_cool', 'off'],
      hvac_action: 'heating',
      preset_mode: 'sleep',
      preset_modes: ['home', 'away', 'sleep'],
      friendly_name: 'Upstairs Thermostat',
    },
  },
  {
    entity_id: 'climate.office',
    friendly_name: 'Office Mini Split',
    state: 'heat',
    domain: 'climate',
    attributes: {
      temperature: 73,
      current_temperature: 71.2,
      hvac_modes: ['heat', 'cool', 'dry', 'fan_only', 'off'],
      hvac_action: 'heating',
      swing_mode: 'off',
      swing_modes: ['off', 'vertical', 'horizontal', 'both'],
      friendly_name: 'Office Mini Split',
    },
  },

  // ──────────────────────────────────────────────────────────
  // COVERS
  // ──────────────────────────────────────────────────────────
  {
    entity_id: 'cover.living_room_blinds',
    friendly_name: 'Living Room Blinds',
    state: 'open',
    domain: 'cover',
    attributes: {
      current_position: 85,
      device_class: 'blind',
      supported_features: 15,
      friendly_name: 'Living Room Blinds',
    },
  },
  {
    entity_id: 'cover.master_bedroom_blinds',
    friendly_name: 'Master Bedroom Blinds',
    state: 'closed',
    domain: 'cover',
    attributes: {
      current_position: 0,
      device_class: 'blind',
      supported_features: 15,
      friendly_name: 'Master Bedroom Blinds',
    },
  },
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
    entity_id: 'cover.office_blinds',
    friendly_name: 'Office Blinds',
    state: 'open',
    domain: 'cover',
    attributes: {
      current_position: 60,
      device_class: 'blind',
      supported_features: 15,
      friendly_name: 'Office Blinds',
    },
  },

  // ──────────────────────────────────────────────────────────
  // CAMERAS
  // ──────────────────────────────────────────────────────────
  {
    entity_id: 'camera.front_door',
    friendly_name: 'Front Door Camera',
    state: 'idle',
    domain: 'camera',
    attributes: {
      access_token: 'fake_token_front',
      entity_picture: '/api/camera_proxy/camera.front_door',
      friendly_name: 'Front Door Camera',
      frontend_stream_type: 'hls',
    },
  },
  {
    entity_id: 'camera.backyard',
    friendly_name: 'Backyard Camera',
    state: 'idle',
    domain: 'camera',
    attributes: {
      access_token: 'fake_token_backyard',
      entity_picture: '/api/camera_proxy/camera.backyard',
      friendly_name: 'Backyard Camera',
      frontend_stream_type: 'hls',
    },
  },
  {
    entity_id: 'camera.driveway',
    friendly_name: 'Driveway Camera',
    state: 'recording',
    domain: 'camera',
    attributes: {
      access_token: 'fake_token_driveway',
      entity_picture: '/api/camera_proxy/camera.driveway',
      friendly_name: 'Driveway Camera',
      frontend_stream_type: 'hls',
    },
  },

  // ──────────────────────────────────────────────────────────
  // AUTOMATIONS
  // ──────────────────────────────────────────────────────────
  {
    entity_id: 'automation.morning_routine',
    friendly_name: 'Morning Routine',
    state: 'on',
    domain: 'automation',
    attributes: {
      last_triggered: '2026-03-13T06:30:00.000Z',
      mode: 'single',
      current: 0,
      friendly_name: 'Morning Routine',
      icon: 'mdi:weather-sunset-up',
    },
  },
  {
    entity_id: 'automation.goodnight',
    friendly_name: 'Goodnight Routine',
    state: 'on',
    domain: 'automation',
    attributes: {
      last_triggered: '2026-03-12T22:30:00.000Z',
      mode: 'single',
      current: 0,
      friendly_name: 'Goodnight Routine',
      icon: 'mdi:weather-night',
    },
  },
  {
    entity_id: 'automation.motion_lights_hallway',
    friendly_name: 'Hallway Motion Lights',
    state: 'on',
    domain: 'automation',
    attributes: {
      last_triggered: '2026-03-13T08:12:00.000Z',
      mode: 'restart',
      current: 0,
      friendly_name: 'Hallway Motion Lights',
    },
  },
  {
    entity_id: 'automation.away_mode',
    friendly_name: 'Away Mode Security',
    state: 'on',
    domain: 'automation',
    attributes: {
      last_triggered: '2026-03-10T14:00:00.000Z',
      mode: 'single',
      current: 0,
      friendly_name: 'Away Mode Security',
      icon: 'mdi:shield-home',
    },
  },
  {
    entity_id: 'automation.garage_auto_close',
    friendly_name: 'Auto Close Garage After 10min',
    state: 'on',
    domain: 'automation',
    attributes: {
      last_triggered: '2026-03-12T17:45:00.000Z',
      mode: 'single',
      current: 0,
      friendly_name: 'Auto Close Garage After 10min',
    },
  },

  // ──────────────────────────────────────────────────────────
  // SCRIPTS
  // ──────────────────────────────────────────────────────────
  {
    entity_id: 'script.movie_mode',
    friendly_name: 'Movie Mode',
    state: 'off',
    domain: 'script',
    attributes: {
      last_triggered: '2026-03-11T20:00:00.000Z',
      mode: 'single',
      friendly_name: 'Movie Mode',
      icon: 'mdi:movie-open',
    },
  },
  {
    entity_id: 'script.all_lights_off',
    friendly_name: 'All Lights Off',
    state: 'off',
    domain: 'script',
    attributes: {
      last_triggered: '2026-03-12T22:31:00.000Z',
      mode: 'single',
      friendly_name: 'All Lights Off',
      icon: 'mdi:lightbulb-off',
    },
  },
  {
    entity_id: 'script.party_mode',
    friendly_name: 'Party Mode',
    state: 'off',
    domain: 'script',
    attributes: {
      last_triggered: '2026-02-28T19:00:00.000Z',
      mode: 'single',
      friendly_name: 'Party Mode',
      icon: 'mdi:party-popper',
    },
  },

  // ──────────────────────────────────────────────────────────
  // INPUT BOOLEANS
  // ──────────────────────────────────────────────────────────
  {
    entity_id: 'input_boolean.guest_mode',
    friendly_name: 'Guest Mode',
    state: 'off',
    domain: 'input_boolean',
    attributes: { friendly_name: 'Guest Mode', icon: 'mdi:account-group' },
  },
  {
    entity_id: 'input_boolean.vacation_mode',
    friendly_name: 'Vacation Mode',
    state: 'off',
    domain: 'input_boolean',
    attributes: { friendly_name: 'Vacation Mode', icon: 'mdi:airplane' },
  },
  {
    entity_id: 'input_boolean.sleep_mode',
    friendly_name: 'Sleep Mode',
    state: 'off',
    domain: 'input_boolean',
    attributes: { friendly_name: 'Sleep Mode', icon: 'mdi:sleep' },
  },
  {
    entity_id: 'input_boolean.do_not_disturb',
    friendly_name: 'Do Not Disturb',
    state: 'off',
    domain: 'input_boolean',
    attributes: { friendly_name: 'Do Not Disturb', icon: 'mdi:minus-circle' },
  },

  // ──────────────────────────────────────────────────────────
  // INPUT NUMBERS
  // ──────────────────────────────────────────────────────────
  {
    entity_id: 'input_number.default_brightness',
    friendly_name: 'Default Light Brightness',
    state: '80',
    domain: 'input_number',
    attributes: {
      min: 0,
      max: 100,
      step: 5,
      mode: 'slider',
      unit_of_measurement: '%',
      friendly_name: 'Default Light Brightness',
      icon: 'mdi:brightness-6',
    },
  },
  {
    entity_id: 'input_number.alarm_volume',
    friendly_name: 'Alarm Volume',
    state: '50',
    domain: 'input_number',
    attributes: {
      min: 0,
      max: 100,
      step: 10,
      mode: 'slider',
      unit_of_measurement: '%',
      friendly_name: 'Alarm Volume',
      icon: 'mdi:volume-high',
    },
  },

  // ──────────────────────────────────────────────────────────
  // INPUT SELECTS
  // ──────────────────────────────────────────────────────────
  {
    entity_id: 'input_select.house_mode',
    friendly_name: 'House Mode',
    state: 'Home',
    domain: 'input_select',
    attributes: {
      options: ['Home', 'Away', 'Night', 'Guest', 'Vacation'],
      friendly_name: 'House Mode',
      icon: 'mdi:home-variant',
    },
  },
  {
    entity_id: 'input_select.light_scene',
    friendly_name: 'Light Scene',
    state: 'Relax',
    domain: 'input_select',
    attributes: {
      options: ['Bright', 'Relax', 'Movie', 'Night Light', 'Off'],
      friendly_name: 'Light Scene',
      icon: 'mdi:palette',
    },
  },

  // ──────────────────────────────────────────────────────────
  // PERSONS
  // ──────────────────────────────────────────────────────────
  {
    entity_id: 'person.john',
    friendly_name: 'John',
    state: 'home',
    domain: 'person',
    attributes: {
      editable: true,
      id: 'john',
      latitude: 40.7128,
      longitude: -74.006,
      gps_accuracy: 10,
      source: 'device_tracker.john_phone',
      friendly_name: 'John',
      entity_picture: '/local/john.jpg',
    },
  },
  {
    entity_id: 'person.sarah',
    friendly_name: 'Sarah',
    state: 'home',
    domain: 'person',
    attributes: {
      editable: true,
      id: 'sarah',
      latitude: 40.7128,
      longitude: -74.006,
      gps_accuracy: 8,
      source: 'device_tracker.sarah_phone',
      friendly_name: 'Sarah',
      entity_picture: '/local/sarah.jpg',
    },
  },
  {
    entity_id: 'person.emma',
    friendly_name: 'Emma',
    state: 'not_home',
    domain: 'person',
    attributes: {
      editable: true,
      id: 'emma',
      source: 'device_tracker.emma_phone',
      friendly_name: 'Emma',
      entity_picture: '/local/emma.jpg',
    },
  },

  // ──────────────────────────────────────────────────────────
  // DEVICE TRACKERS
  // ──────────────────────────────────────────────────────────
  {
    entity_id: 'device_tracker.john_phone',
    friendly_name: "John's iPhone",
    state: 'home',
    domain: 'device_tracker',
    attributes: {
      source_type: 'gps',
      battery_level: 78,
      latitude: 40.7128,
      longitude: -74.006,
      gps_accuracy: 10,
      friendly_name: "John's iPhone",
    },
  },
  {
    entity_id: 'device_tracker.sarah_phone',
    friendly_name: "Sarah's Pixel",
    state: 'home',
    domain: 'device_tracker',
    attributes: {
      source_type: 'gps',
      battery_level: 54,
      latitude: 40.7128,
      longitude: -74.006,
      gps_accuracy: 8,
      friendly_name: "Sarah's Pixel",
    },
  },
  {
    entity_id: 'device_tracker.emma_phone',
    friendly_name: "Emma's iPhone",
    state: 'not_home',
    domain: 'device_tracker',
    attributes: {
      source_type: 'gps',
      battery_level: 91,
      friendly_name: "Emma's iPhone",
    },
  },

  // ──────────────────────────────────────────────────────────
  // WEATHER
  // ──────────────────────────────────────────────────────────
  {
    entity_id: 'weather.home',
    friendly_name: 'Home',
    state: 'partlycloudy',
    domain: 'weather',
    attributes: {
      temperature: 38,
      temperature_unit: '°F',
      humidity: 62,
      pressure: 30.12,
      pressure_unit: 'inHg',
      wind_bearing: 215,
      wind_speed: 8.5,
      wind_speed_unit: 'mph',
      visibility: 10,
      visibility_unit: 'mi',
      forecast: [
        { datetime: '2026-03-14', condition: 'rainy', temperature: 42, templow: 33 },
        { datetime: '2026-03-15', condition: 'cloudy', temperature: 45, templow: 36 },
        { datetime: '2026-03-16', condition: 'sunny', temperature: 52, templow: 38 },
        { datetime: '2026-03-17', condition: 'partlycloudy', temperature: 48, templow: 35 },
        { datetime: '2026-03-18', condition: 'sunny', temperature: 55, templow: 40 },
      ],
      friendly_name: 'Home',
    },
  },

  // ──────────────────────────────────────────────────────────
  // ALARM CONTROL PANEL
  // ──────────────────────────────────────────────────────────
  {
    entity_id: 'alarm_control_panel.home',
    friendly_name: 'Home Alarm',
    state: 'disarmed',
    domain: 'alarm_control_panel',
    attributes: {
      code_format: 'number',
      changed_by: 'John',
      code_arm_required: true,
      supported_features: 63,
      friendly_name: 'Home Alarm',
    },
  },

  // ──────────────────────────────────────────────────────────
  // FANS
  // ──────────────────────────────────────────────────────────
  {
    entity_id: 'fan.living_room_ceiling',
    friendly_name: 'Living Room Ceiling Fan',
    state: 'on',
    domain: 'fan',
    attributes: {
      percentage: 66,
      percentage_step: 33.33,
      preset_mode: 'auto',
      preset_modes: ['auto', 'smart', 'sleep', 'nature'],
      direction: 'forward',
      oscillating: false,
      supported_features: 63,
      friendly_name: 'Living Room Ceiling Fan',
    },
  },
  {
    entity_id: 'fan.master_bedroom_ceiling',
    friendly_name: 'Master Bedroom Ceiling Fan',
    state: 'on',
    domain: 'fan',
    attributes: {
      percentage: 33,
      percentage_step: 33.33,
      preset_mode: 'sleep',
      preset_modes: ['auto', 'sleep', 'nature'],
      direction: 'forward',
      oscillating: false,
      supported_features: 63,
      friendly_name: 'Master Bedroom Ceiling Fan',
    },
  },
  {
    entity_id: 'fan.office_desk',
    friendly_name: 'Office Desk Fan',
    state: 'off',
    domain: 'fan',
    attributes: {
      percentage: 0,
      oscillating: false,
      supported_features: 49,
      friendly_name: 'Office Desk Fan',
    },
  },

  // ──────────────────────────────────────────────────────────
  // LOCKS
  // ──────────────────────────────────────────────────────────
  {
    entity_id: 'lock.front_door',
    friendly_name: 'Front Door Lock',
    state: 'locked',
    domain: 'lock',
    attributes: {
      changed_by: 'John (PIN)',
      code_format: 'number',
      supported_features: 4,
      friendly_name: 'Front Door Lock',
    },
  },
  {
    entity_id: 'lock.back_door',
    friendly_name: 'Back Door Lock',
    state: 'locked',
    domain: 'lock',
    attributes: {
      changed_by: 'Sarah (PIN)',
      code_format: 'number',
      supported_features: 4,
      friendly_name: 'Back Door Lock',
    },
  },
  {
    entity_id: 'lock.garage_entry',
    friendly_name: 'Garage Entry Lock',
    state: 'unlocked',
    domain: 'lock',
    attributes: {
      changed_by: 'Automation',
      supported_features: 4,
      friendly_name: 'Garage Entry Lock',
    },
  },

  // ──────────────────────────────────────────────────────────
  // VACUUM
  // ──────────────────────────────────────────────────────────
  {
    entity_id: 'vacuum.roborock',
    friendly_name: 'Roborock S7',
    state: 'docked',
    domain: 'vacuum',
    attributes: {
      battery_level: 100,
      battery_icon: 'mdi:battery',
      fan_speed: 'balanced',
      fan_speed_list: ['silent', 'balanced', 'turbo', 'max'],
      status: 'Charging',
      supported_features: 14204,
      friendly_name: 'Roborock S7',
    },
  },

  // ──────────────────────────────────────────────────────────
  // WATER HEATER
  // ──────────────────────────────────────────────────────────
  {
    entity_id: 'water_heater.main',
    friendly_name: 'Water Heater',
    state: 'eco',
    domain: 'water_heater',
    attributes: {
      temperature: 120,
      target_temp_high: 130,
      target_temp_low: 110,
      current_temperature: 118,
      operation_mode: 'eco',
      operation_list: ['eco', 'electric', 'performance', 'heat_pump', 'off'],
      friendly_name: 'Water Heater',
    },
  },

  // ──────────────────────────────────────────────────────────
  // UPDATE
  // ──────────────────────────────────────────────────────────
  {
    entity_id: 'update.home_assistant_core',
    friendly_name: 'Home Assistant Core Update',
    state: 'on',
    domain: 'update',
    attributes: {
      installed_version: '2026.2.5',
      latest_version: '2026.3.1',
      title: 'Home Assistant Core',
      release_url: 'https://www.home-assistant.io/blog/',
      skipped_version: null,
      in_progress: false,
      auto_update: false,
      supported_features: 25,
      friendly_name: 'Home Assistant Core Update',
      entity_picture: 'https://brands.home-assistant.io/homeassistant/icon.png',
    },
  },
  {
    entity_id: 'update.hacs',
    friendly_name: 'HACS Update',
    state: 'off',
    domain: 'update',
    attributes: {
      installed_version: '2.0.1',
      latest_version: '2.0.1',
      title: 'HACS',
      in_progress: false,
      auto_update: false,
      supported_features: 1,
      friendly_name: 'HACS Update',
    },
  },
  {
    entity_id: 'update.mosquitto_broker',
    friendly_name: 'Mosquitto Broker Update',
    state: 'on',
    domain: 'update',
    attributes: {
      installed_version: '6.3.1',
      latest_version: '6.4.0',
      title: 'Mosquitto broker',
      in_progress: false,
      auto_update: false,
      supported_features: 25,
      friendly_name: 'Mosquitto Broker Update',
    },
  },
];

// ============================================================
// Helper Functions
// ============================================================

/**
 * Get all entities for a specific domain.
 */
export function getEntitiesByDomain(domain: string): HAEntity[] {
  return fakeEntities.filter((e) => e.domain === domain);
}

/**
 * Search entities by query string. Matches against entity_id and friendly_name (case-insensitive).
 */
export function searchEntities(query: string): HAEntity[] {
  const q = query.toLowerCase();
  return fakeEntities.filter(
    (e) =>
      e.entity_id.toLowerCase().includes(q) ||
      e.friendly_name.toLowerCase().includes(q)
  );
}

/**
 * Get a sorted list of all unique domains present in the entity database.
 */
export function getAllDomains(): string[] {
  return [...new Set(fakeEntities.map((e) => e.domain))].sort();
}
