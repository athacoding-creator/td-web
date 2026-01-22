import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Simple query to keep database alive
    const { data, error: queryError } = await supabase
      .from('stats')
      .select('id')
      .limit(1)

    if (queryError) {
      throw queryError
    }

    // Log the successful ping
    const { error: logError } = await supabase
      .from('keep_alive_logs')
      .insert({
        status: 'success',
        message: 'Database keep-alive ping successful'
      })

    if (logError) {
      console.error('Failed to log keep-alive:', logError)
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Keep-alive ping successful',
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Keep-alive error:', errorMessage)

    // Try to log the failure
    try {
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!
      const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
      const supabase = createClient(supabaseUrl, supabaseServiceKey)
      
      await supabase
        .from('keep_alive_logs')
        .insert({
          status: 'error',
          message: errorMessage
        })
    } catch (logError) {
      console.error('Failed to log error:', logError)
    }

    return new Response(
      JSON.stringify({ 
        success: false, 
        error: errorMessage 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})

