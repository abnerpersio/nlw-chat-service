import { Request, Response } from 'express';
import { SettingsService } from '../services/SettingsService';

class SettingsController {
  async create(req: Request, res: Response) {
    const settingsService = new SettingsService();
    const { chat, username } = req.body;

    try {
      const settings = await settingsService.create({ chat, username });

      return res.json(settings);
    } catch (error) {
      return res.status(400).json({ code: 1, message: error.message });
    }
  }

  async findByUsername(req: Request, res: Response) {
    const settingsService = new SettingsService();
    const { username } = req.params;

    const settings = await settingsService.findByUsername(username);
    return res.json(settings);
  }

  async update(req: Request, res: Response) {
    const settingsService = new SettingsService();
    const { username } = req.params;
    const { chat } = req.body;

    const settings = await settingsService.update(username, chat);
    return res.json(settings);
  }
}

export { SettingsController };
