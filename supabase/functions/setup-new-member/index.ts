import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  try {
    // Add OPTIONS handling for CORS during local development
    if (req.method === 'OPTIONS') {
      return new Response('ok', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        }
      })
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    // Add a test endpoint
    const url = new URL(req.url)
    if (url.pathname.endsWith('/test')) {
      return new Response(
        JSON.stringify({ 
          message: 'Test endpoint working',
          env: {
            supabaseUrl: Deno.env.get('SUPABASE_URL'),
            // Don't log the actual key in production!
            hasAnonKey: !!Deno.env.get('SUPABASE_ANON_KEY')
          }
        }),
        { 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          } 
        }
      )
    }

    const { user } = await req.json()

    // Perform any additional setup needed for new members
    // For example: create initial credit balance, send welcome email, etc.

    return new Response(
      JSON.stringify({ 
        message: 'Member setup completed successfully',
        user: user 
      }),
      { 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        } 
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        } 
      }
    )
  }
}) 