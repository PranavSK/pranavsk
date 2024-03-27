#let resume(body) = {
  set list(indent: 1em)
  show list: set text(size: 0.92em)
  
  set page(
    paper: "us-letter",
    margin: (x: 0.5in, y: 0.5in)
  )
  show strong: set text(fill: rgb("#3B352B"), weight: "extrabold")
  set text(
    size: 11pt,
    font: "Rubik",
    fill: rgb("#63635E")
  )
  
  body
}

#let name_header(name) = {
  set text(size: 2.25em, weight: 800)
  [#name]
}

#let with_icon(icon, content) = {
  box(height: 1em, baseline: 15%)[#pad(right: 0.2em)[#image(icon)]]
  content
}

#let link_icon(icon, url) = {
  link(url)[#box(height: 1em, baseline: 15%)[#image(icon)]]
}

#let header(info) = {
  align(center, block[
    #name_header(info.firstName + " " + info.lastName) \
      #with_icon("./icons/phone.svg", info.phone) |
      #link("mailto:" + info.email)[#with_icon("./icons/mail.svg", info.email)] |
      #link_icon("./icons/www.svg", info.website) |
      #link_icon("./icons/github.svg", "https://github.com/"+info.github) |
      #link_icon("./icons/linkedin.svg", "https://linkedin.com/in/"+info.linkedin)
  ])
  v(5pt)
}

#let section_header(title) = {
  show heading: set text(size: 0.92em, weight: "bold", fill: rgb("#3B352B"))
  block[
    = #smallcaps(title)
    #v(-2pt)
    #line(length: 100%, stroke: 0.2pt + black)
  ]
}

#let summary(data) = {
  set block(above: 0.7em, below: 1em)
  pad(left: 1em, right: 0.5em, 
    for value in data {
      [#value\ ]
    }
  )
}

#let format_date(date) = {
  let parts = date.split("-")
  if parts.len() != 2 {
    return date
  }
  let month = int(parts.at(1)) - 1
  let months = ("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec")
  return months.at(month) + " " + parts.at(0)
}

#let edu_item(data) = {
  set block(above: 0.7em, below: 1em)
  pad(left: 1em, right: 0.5em, box[
    #grid(
      columns: (3fr, 1fr),
      align(left)[
        *#data.degree*, _#data.major _\
          _#data.school _
      ],
      align(right)[
        *#format_date(data.start)* _to_ *#format_date(data.end)*\
          _#data.location _
      ]
    )
    ])
}

#let work_item(data) = {
  set block(above: 0.7em, below: 1em)
  pad(left: 1em, right: 0.5em, box[
    #grid(
      columns: (3fr, 1fr),
      align(left)[ 
        *#data.role*\
          _#if "team" in data [#data.team, ]#data.organization _
      ], 
      align(right)[
        *#format_date(data.start)* _to_ *#format_date(data.end)*\
          _#data.location _
      ]
    )
    #list(..data.description)
  ])
}

#let extract_yaml(file_content) = {
  let chunks = file_content.split("---")
  return yaml.decode(chunks.at(1))
}

#let project_item(data) = {
  set block(above: 0.7em, below: 1em)
  pad(left: 1em, right: 0.5em, box[
    *#data.title* | #text(size: 10pt, font: "mononoki",)[_#data.skills.join(", ")_] \
      #data.description
  ])
}

#show: resume
#let info = yaml("../src/content/info/me.yaml")
#header(info)

#section_header("Summary")
#summary(info.aboutDetailed)

#section_header("Education")
#edu_item(yaml("../src/content/education/rvce.yaml"))

#section_header("Work Experience")
#work_item(yaml("../src/content/work/byjus.yaml"))
#work_item(yaml("../src/content/work/freelance.yaml"))
#work_item(yaml("../src/content/work/uos.yaml"))
#work_item(yaml("../src/content/work/iisc.yaml"))

#section_header("Projects")
#project_item(extract_yaml(read("../src/content/project/appcraft-astro.md")))
#project_item(extract_yaml(read("../src/content/project/appcraft.md")))
#project_item(extract_yaml(read("../src/content/project/byjus-us-math-applets.md")))
#project_item(extract_yaml(read("../src/content/project/uno-slides.md")))
