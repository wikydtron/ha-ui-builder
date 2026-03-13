import type { CardSchema } from '../types';

// ============================================================
// Sensor & Data Card Schemas
// ============================================================

export const gaugeCardSchema: CardSchema = {
  type: 'gauge',
  label: 'Gauge',
  description: 'Display a sensor value as a gauge dial with configurable severity levels.',
  icon: 'Gauge',
  category: 'sensor',
  fields: [
    {
      name: 'entity',
      label: 'Entity',
      type: 'entity',
      required: true,
      helpText: 'Sensor entity to display on the gauge.',
      isHAStandard: true,
    },
    {
      name: 'name',
      label: 'Name Override',
      type: 'text',
      helpText: 'Custom name displayed below the gauge.',
    },
    {
      name: 'unit',
      label: 'Unit',
      type: 'text',
      helpText: 'Override the unit of measurement shown on the gauge.',
    },
    {
      name: 'min',
      label: 'Minimum Value',
      type: 'number',
      default: 0,
      helpText: 'Minimum value on the gauge scale.',
    },
    {
      name: 'max',
      label: 'Maximum Value',
      type: 'number',
      default: 100,
      helpText: 'Maximum value on the gauge scale.',
    },
    {
      name: 'needle',
      label: 'Show Needle',
      type: 'boolean',
      default: false,
      helpText: 'Display a needle instead of a filled arc.',
    },
    {
      name: 'severity',
      label: 'Severity Levels (YAML)',
      type: 'yaml',
      helpText: 'Define color thresholds: green, yellow, red with numeric values.',
    },
    {
      name: 'theme',
      label: 'Theme',
      type: 'text',
      helpText: 'Set a custom theme for this card.',
    },
  ],
};

export const weatherForecastCardSchema: CardSchema = {
  type: 'weather-forecast',
  label: 'Weather Forecast',
  description: 'Display current weather conditions and a multi-day forecast.',
  icon: 'CloudSun',
  category: 'sensor',
  fields: [
    {
      name: 'entity',
      label: 'Weather Entity',
      type: 'entity',
      required: true,
      helpText: 'Weather entity (e.g., weather.home).',
      isHAStandard: true,
    },
    {
      name: 'name',
      label: 'Name Override',
      type: 'text',
      helpText: 'Custom name for the weather card.',
    },
    {
      name: 'show_current',
      label: 'Show Current',
      type: 'boolean',
      default: true,
      helpText: 'Show current weather conditions.',
    },
    {
      name: 'show_forecast',
      label: 'Show Forecast',
      type: 'boolean',
      default: true,
      helpText: 'Show the multi-day forecast.',
    },
    {
      name: 'forecast_type',
      label: 'Forecast Type',
      type: 'select',
      default: 'daily',
      options: [
        { label: 'Daily', value: 'daily' },
        { label: 'Hourly', value: 'hourly' },
        { label: 'Twice Daily', value: 'twice_daily' },
      ],
      helpText: 'Type of forecast to display.',
    },
    {
      name: 'secondary_info_attribute',
      label: 'Secondary Info',
      type: 'text',
      helpText: 'Attribute to show as secondary info (e.g., humidity, wind_speed).',
    },
    {
      name: 'theme',
      label: 'Theme',
      type: 'text',
      helpText: 'Set a custom theme for this card.',
    },
  ],
};

export const thermostatCardSchema: CardSchema = {
  type: 'thermostat',
  label: 'Thermostat',
  description: 'Control a climate entity with a visual thermostat dial.',
  icon: 'Thermometer',
  category: 'sensor',
  fields: [
    {
      name: 'entity',
      label: 'Climate Entity',
      type: 'entity',
      required: true,
      helpText: 'Climate entity to control (e.g., climate.living_room).',
      isHAStandard: true,
    },
    {
      name: 'name',
      label: 'Name Override',
      type: 'text',
      helpText: 'Custom name for the thermostat.',
    },
    {
      name: 'features',
      label: 'Features (YAML)',
      type: 'yaml',
      helpText: 'List of feature rows to display (e.g., target-temperature, hvac-modes).',
    },
    {
      name: 'theme',
      label: 'Theme',
      type: 'text',
      helpText: 'Set a custom theme for this card.',
    },
  ],
};

export const historyGraphCardSchema: CardSchema = {
  type: 'history-graph',
  label: 'History Graph',
  description: 'Display a historical graph of entity state changes over time.',
  icon: 'LineChart',
  category: 'sensor',
  fields: [
    {
      name: 'entities',
      label: 'Entities',
      type: 'entities-list',
      required: true,
      helpText: 'List of entities to graph.',
      isHAStandard: true,
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      helpText: 'Title displayed above the graph.',
    },
    {
      name: 'hours_to_show',
      label: 'Hours to Show',
      type: 'number',
      default: 24,
      min: 1,
      max: 720,
      helpText: 'Number of hours of history to display.',
    },
    {
      name: 'refresh_interval',
      label: 'Refresh Interval (seconds)',
      type: 'number',
      default: 0,
      min: 0,
      helpText: 'How often to refresh the graph. 0 uses the default.',
    },
    {
      name: 'logarithmic_scale',
      label: 'Logarithmic Scale',
      type: 'boolean',
      default: false,
      helpText: 'Use a logarithmic Y-axis scale.',
    },
    {
      name: 'min_y_axis',
      label: 'Min Y-Axis',
      type: 'number',
      helpText: 'Fixed minimum value for the Y-axis.',
    },
    {
      name: 'max_y_axis',
      label: 'Max Y-Axis',
      type: 'number',
      helpText: 'Fixed maximum value for the Y-axis.',
    },
    {
      name: 'theme',
      label: 'Theme',
      type: 'text',
      helpText: 'Set a custom theme for this card.',
    },
  ],
};

export const statisticCardSchema: CardSchema = {
  type: 'statistic',
  label: 'Statistic',
  description: 'Display a long-term statistic value for a single entity.',
  icon: 'BarChart3',
  category: 'sensor',
  fields: [
    {
      name: 'entity',
      label: 'Entity',
      type: 'entity',
      required: true,
      helpText: 'Entity with long-term statistics.',
      isHAStandard: true,
    },
    {
      name: 'name',
      label: 'Name Override',
      type: 'text',
      helpText: 'Custom name displayed on the card.',
    },
    {
      name: 'stat_type',
      label: 'Statistic Type',
      type: 'select',
      required: true,
      default: 'mean',
      options: [
        { label: 'Mean', value: 'mean' },
        { label: 'Min', value: 'min' },
        { label: 'Max', value: 'max' },
        { label: 'Sum', value: 'sum' },
        { label: 'State', value: 'state' },
        { label: 'Change', value: 'change' },
      ],
      helpText: 'Which statistical measure to display.',
    },
    {
      name: 'period',
      label: 'Period',
      type: 'nested',
      helpText: 'Time period for the statistic.',
      nestedFields: [
        {
          name: 'calendar',
          label: 'Calendar Period',
          type: 'nested',
          nestedFields: [
            {
              name: 'period',
              label: 'Period',
              type: 'select',
              options: [
                { label: 'Day', value: 'day' },
                { label: 'Week', value: 'week' },
                { label: 'Month', value: 'month' },
                { label: 'Year', value: 'year' },
              ],
            },
            {
              name: 'offset',
              label: 'Offset',
              type: 'number',
              default: 0,
              helpText: 'Number of periods to offset (negative for past).',
            },
          ],
        },
      ],
    },
    {
      name: 'unit',
      label: 'Unit Override',
      type: 'text',
      helpText: 'Override the unit of measurement.',
    },
    {
      name: 'theme',
      label: 'Theme',
      type: 'text',
      helpText: 'Set a custom theme for this card.',
    },
  ],
};

export const energyDistributionCardSchema: CardSchema = {
  type: 'energy-distribution',
  label: 'Energy Distribution',
  description: 'Display the flow of energy through your home: grid, solar, battery, and consumption.',
  icon: 'Zap',
  category: 'sensor',
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      helpText: 'Title displayed at the top of the card.',
    },
    {
      name: 'link_dashboard',
      label: 'Link to Dashboard',
      type: 'boolean',
      default: false,
      helpText: 'Add a link to the energy dashboard.',
    },
    {
      name: 'collection_key',
      label: 'Collection Key',
      type: 'text',
      default: 'energy_dashboard',
      helpText: 'Advanced: use a different energy collection.',
    },
    {
      name: 'theme',
      label: 'Theme',
      type: 'text',
      helpText: 'Set a custom theme for this card.',
    },
  ],
};

export const logbookCardSchema: CardSchema = {
  type: 'logbook',
  label: 'Logbook',
  description: 'Show recent logbook entries for one or more entities.',
  icon: 'ScrollText',
  category: 'sensor',
  fields: [
    {
      name: 'entities',
      label: 'Entities',
      type: 'entities-list',
      helpText: 'Filter logbook to these entities. Leave empty for all entries.',
      isHAStandard: true,
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      helpText: 'Title displayed at the top of the card.',
    },
    {
      name: 'hours_to_show',
      label: 'Hours to Show',
      type: 'number',
      default: 24,
      min: 1,
      max: 720,
      helpText: 'Number of hours of history to display.',
    },
    {
      name: 'theme',
      label: 'Theme',
      type: 'text',
      helpText: 'Set a custom theme for this card.',
    },
  ],
};

export const mapCardSchema: CardSchema = {
  type: 'map',
  label: 'Map',
  description: 'Display entities with location data on an interactive map.',
  icon: 'MapPin',
  category: 'sensor',
  fields: [
    {
      name: 'entities',
      label: 'Entities',
      type: 'entities-list',
      required: true,
      helpText: 'List of entities with GPS coordinates or zones to display.',
      isHAStandard: true,
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      helpText: 'Title displayed at the top of the card.',
    },
    {
      name: 'aspect_ratio',
      label: 'Aspect Ratio',
      type: 'text',
      default: '16:9',
      helpText: 'Aspect ratio of the map (e.g., 16:9, 1:1).',
    },
    {
      name: 'default_zoom',
      label: 'Default Zoom',
      type: 'number',
      default: 14,
      min: 1,
      max: 20,
      helpText: 'Default zoom level of the map.',
    },
    {
      name: 'dark_mode',
      label: 'Dark Mode',
      type: 'boolean',
      default: false,
      helpText: 'Use a dark map theme.',
    },
    {
      name: 'hours_to_show',
      label: 'Hours to Show',
      type: 'number',
      default: 0,
      min: 0,
      helpText: 'Show location history trail. 0 disables trails.',
    },
    {
      name: 'geo_location_sources',
      label: 'Geo Location Sources (YAML)',
      type: 'yaml',
      helpText: 'List of geolocation source types to display.',
    },
    {
      name: 'theme',
      label: 'Theme',
      type: 'text',
      helpText: 'Set a custom theme for this card.',
    },
  ],
};

export const alarmPanelCardSchema: CardSchema = {
  type: 'alarm-panel',
  label: 'Alarm Panel',
  description: 'Control an alarm panel entity with a keypad interface.',
  icon: 'ShieldAlert',
  category: 'sensor',
  fields: [
    {
      name: 'entity',
      label: 'Alarm Entity',
      type: 'entity',
      required: true,
      helpText: 'Alarm control panel entity (e.g., alarm_control_panel.home).',
      isHAStandard: true,
    },
    {
      name: 'name',
      label: 'Name Override',
      type: 'text',
      helpText: 'Custom name for the alarm panel.',
    },
    {
      name: 'states',
      label: 'Available States',
      type: 'list',
      default: ['arm_home', 'arm_away'],
      helpText: 'List of arm states to show as buttons (arm_home, arm_away, arm_night, arm_vacation, arm_custom_bypass).',
    },
    {
      name: 'theme',
      label: 'Theme',
      type: 'text',
      helpText: 'Set a custom theme for this card.',
    },
  ],
};

export const sensorCardSchemas: CardSchema[] = [
  gaugeCardSchema,
  weatherForecastCardSchema,
  thermostatCardSchema,
  historyGraphCardSchema,
  statisticCardSchema,
  energyDistributionCardSchema,
  logbookCardSchema,
  mapCardSchema,
  alarmPanelCardSchema,
];
