# EmailJS Troubleshooting Guide

## Common Issues: Email Sent Successfully But Not Received

If you're seeing the success message but not receiving emails, check these:

### 1. Check Your Email Service Configuration

Go to: https://dashboard.emailjs.com/admin/integration

**For Gmail:**
- Make sure you've connected your Gmail account
- Check that the email address in "To Email" field is correct
- Verify the service is "Active"

**For Other Services:**
- Ensure your email service is properly connected
- Check the "To Email" field in your template

### 2. Check Your Email Template

Go to: https://dashboard.emailjs.com/admin/template

**Template Settings:**
- **To Email**: Must be set to YOUR email address (e.g., yourname@gmail.com)
- **From Name**: Can be anything (e.g., "Wedding RSVP")
- **Subject**: Should include `{{guest_name}}` or similar variable
- **Content**: Must include all template variables:
  - `{{guest_name}}`
  - `{{attending}}`
  - `{{welcome_cocktail}}`
  - `{{shuttle_ciudad_real}}`
  - `{{shuttle_almagro}}`
  - `{{plus_one}}`
  - `{{dietary_restrictions}}`
  - `{{other_restrictions}}`
  - `{{submission_date}}`

### 3. Check Spam/Junk Folder

- Emails might be going to spam
- Check your spam/junk folder
- Mark as "Not Spam" if found

### 4. Verify Template Variables Match

Your template variables in EmailJS dashboard must EXACTLY match:
- `guest_name` (not `guestName` or `guest_name_`)
- `attending`
- `welcome_cocktail`
- `shuttle` (combined shuttle question)
- `plus_one`
- `dietary_restrictions` (single text field)
- `submission_date`

### 5. Test Your Setup

1. Open browser console (F12)
2. Submit the form
3. Check for any error messages
4. Look for "EmailJS Response:" in console - this shows if EmailJS accepted the request

### 6. Check EmailJS Dashboard

Go to: https://dashboard.emailjs.com/admin/logs

- Check if emails are being sent (you'll see logs here)
- Check for any error messages
- Verify your monthly quota hasn't been exceeded (free tier: 200/month)

### 7. Sample Email Template

Here's a complete template you can copy:

**Subject:**
```
New RSVP - {{guest_name}}
```

**Content:**
```
Hello!

You have received a new RSVP for your wedding:

Guest Name: {{guest_name}}
Attending: {{attending}}
Welcome Cocktail: {{welcome_cocktail}}
Shuttle to/from Hotel: {{shuttle}}
Plus One: {{plus_one}}
Dietary Restrictions: {{dietary_restrictions}}

Submitted on: {{submission_date}}
```

**Important:** Make sure these template variables match EXACTLY:
- `{{guest_name}}`
- `{{attending}}`
- `{{welcome_cocktail}}`
- `{{shuttle}}`
- `{{plus_one}}`
- `{{dietary_restrictions}}`
- `{{submission_date}}`

### 8. Still Not Working?

1. **Check browser console** for detailed error messages
2. **Verify credentials** in scripts/main.js match your dashboard
3. **Test with a simple template** first (just guest_name)
4. **Check EmailJS status page** for service issues
5. **Try a different email service** (if using Gmail, try Outlook)

### Your Current Configuration:

- Public Key: `-id_iy_06E2L0hCGA`
- Service ID: `service_s0hynku`
- Template ID: `template_e436pjj`

Make sure these match exactly what's in your EmailJS dashboard!

