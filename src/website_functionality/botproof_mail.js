// This function allows one to click on an email link
// to start an email, though keeps the email bot-proof
// as well.
export const botproofMail = (id) => {
    const currElement = document.getElementById(id)

    window.location.href = `mailto:${
        currElement.dataset.name
    }@${
        currElement.dataset.domain
    }.${
        currElement.dataset.tld
    }`

    return false
}