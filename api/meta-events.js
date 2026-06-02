// api/meta-events.js
// Vercel Serverless Function — Meta Conversions API (server-side)
// Pixel ID: 1238045745074227

const PIXEL_ID = '1238045745074227';
const ACCESS_TOKEN = process.env.META_CAPI_TOKEN;
const API_VERSION = 'v19.0';

function hash(value) {
  if (!value) return undefined;
    const crypto = require('crypto');
      return crypto.createHash('sha256').update(String(value).trim().toLowerCase()).digest('hex');
      }

      export default async function handler(req, res) {
        if (req.method !== 'POST') {
            return res.status(405).json({ error: 'Method not allowed' });
              }

                if (!ACCESS_TOKEN) {
                    console.error('META_CAPI_TOKEN no configurado');
                        return res.status(500).json({ error: 'Server misconfiguration' });
                          }

                            const { eventName, eventSourceUrl, userData = {}, customData = {}, eventId } = req.body;

                              if (!eventName) {
                                  return res.status(400).json({ error: 'eventName es requerido' });
                                    }

                                      const user_data = {
                                          client_ip_address: (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || undefined,
                                              client_user_agent: req.headers['user-agent'] || undefined,
                                                  em: userData.email ? [hash(userData.email)] : undefined,
                                                      ph: userData.phone ? [hash(userData.phone)] : undefined,
                                                          fn: userData.firstName ? [hash(userData.firstName)] : undefined,
                                                              ln: userData.lastName ? [hash(userData.lastName)] : undefined,
                                                                };

                                                                  Object.keys(user_data).forEach((k) => { if (user_data[k] === undefined) delete user_data[k]; });

                                                                    const event = {
                                                                        event_name: eventName,
                                                                            event_time: Math.floor(Date.now() / 1000),
                                                                                event_source_url: eventSourceUrl || req.headers.referer || 'https://asesorlandero.com.mx',
                                                                                    action_source: 'website',
                                                                                        user_data,
                                                                                          };

                                                                                            if (eventId) event.event_id = eventId;
                                                                                              if (Object.keys(customData).length > 0) event.custom_data = customData;

                                                                                                try {
                                                                                                    const response = await fetch(
                                                                                                          `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
                                                                                                                {
                                                                                                                        method: 'POST',
                                                                                                                                headers: { 'Content-Type': 'application/json' },
                                                                                                                                        body: JSON.stringify({ data: [event] }),
                                                                                                                                              }
                                                                                                                                                  );
                                                                                                                                                      const result = await response.json();
                                                                                                                                                          if (!response.ok) return res.status(response.status).json({ error: result });
                                                                                                                                                              return res.status(200).json({ success: true, events_received: result.events_received });
                                                                                                                                                                } catch (err) {
                                                                                                                                                                    console.error('CAPI error:', err.message);
                                                                                                                                                                        return res.status(500).json({ error: 'Internal server error' });
                                                                                                                                                                          }
                                                                                                                                                                          }
