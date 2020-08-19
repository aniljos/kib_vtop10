
import { i18n } from '@kbn/i18n';

import esServiceRoute from './server/routes/esservices';

export default function (kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],
    name: 'visualization_fspl',
    uiExports: {
      app: {
        title: 'Visualization Fspl',
        description: 'FSPL Visualization',
        main: 'plugins/visualization_fspl/app',
      },
      hacks: [
        'plugins/visualization_fspl/hack'
      ],
    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },

    // eslint-disable-next-line no-unused-vars
    init(server, options) {
      const xpackMainPlugin = server.plugins.xpack_main;
      if (xpackMainPlugin) {
        const featureId = 'visualization_fspl';

        xpackMainPlugin.registerFeature({
          id: featureId,
          name: i18n.translate('visualizationFspl.featureRegistry.featureName', {
            defaultMessage: 'visualization_fspl',
          }),
          navLinkId: featureId,
          icon: 'questionInCircle',
          app: [featureId, 'kibana'],
          catalogue: [],
          privileges: {
            all: {
              api: [],
              savedObject: {
                all: [],
                read: [],
              },
              ui: ['show'],
            },
            read: {
              api: [],
              savedObject: {
                all: [],
                read: [],
              },
              ui: ['show'],
            },
          },
        });
      }

      // Add server routes and initialize the plugin here
      esServiceRoute(server);
    }
  });
}
