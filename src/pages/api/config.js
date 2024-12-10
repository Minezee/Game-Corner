import configManager from '../../models/ConfigurationManager';

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(configManager.getConfig());
  } else if (req.method === 'POST') {
    const { newConfig } = req.body;
    configManager.updateConfig(newConfig);
    res.status(200).json({ message: 'Config updated successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
