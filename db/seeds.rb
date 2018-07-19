# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
Genre.destroy_all
Track.destroy_all

User.create!(username: 'Guest', password: 'hunter12')

Genre.create!(name: "Classical")
Genre.create!(name: "Electronic")
Genre.create!(name: "Funk / Soul")
Genre.create!(name: "Hip Hop")
Genre.create!(name: "Jazz")
Genre.create!(name: "Latin")
Genre.create!(name: "Other")
Genre.create!(name: "Pop")
Genre.create!(name: "R&B")
Genre.create!(name: "Reggae")
Genre.create!(name: "Rock")
Genre.create!(name: "Speech")
Genre.create!(name: "Stage & Screen")
Genre.create!(name: "World")

# ARTISTS

eigthday = User.new(username: '8th day', password: 'seedfile')
file = EzDownload.open('https://s3.amazonaws.com/crowd-sound-prod/albums/8th+Day/eigth_day.jpeg')
eigthday.profile_pic.attach(io: file, filename: 'eigth_day.jpeg')
eigthday.save!

mIllowitz = User.new(username: 'Motty Illowitz', password: 'seedfile')
file = EzDownload.open('https://s3.amazonaws.com/crowd-sound-prod/albums/Motty+Ilowitz+-+5778+(2018)+%40JMusicAlbums/mIllowitz.jpeg')
mIllowitz.profile_pic.attach(io: file, filename: 'mIllowitz.jpeg')
mIllowitz.save!

msteinmetz = User.new(username: 'Motty Steinmetz', password: 'seedfile')
file = EzDownload.open('https://s3.amazonaws.com/crowd-sound-prod/albums/Motty+Steinmetz+-+Haneshama+Bekirbi+%40JMusic/download.jpg')
msteinmetz.profile_pic.attach(io: file, filename: 'download.jpg')
msteinmetz.save!


beethoven = User.new(username: 'Ludwig van Beethoven', password: 'seedfile')
file = EzDownload.open('https://s3.amazonaws.com/crowd-sound-prod/albums/beethoven/beethoven.jpeg')
beethoven.profile_pic.attach(io: file, filename: 'beethoven.jpeg')
beethoven.save!

bennyfriedman = User.new(username: 'Benny Friedman', password: 'seedfile')
file = EzDownload.open('https://s3.amazonaws.com/crowd-sound-prod/albums/benny+friedman+Yesh+Tikvah/bennyfriedman.jpeg')
bennyfriedman.profile_pic.attach(io: file, filename: 'bennyfriedman.jpeg')
bennyfriedman.save!

leviRobin = User.new(username: 'Levi Robin', password: 'seedfile')
file = EzDownload.open('https://s3.amazonaws.com/crowd-sound-prod/albums/levi+robin/leviRobinprofile.jpeg')
leviRobin.profile_pic.attach(io: file, filename: 'leviRobinprofile.jpeg')
leviRobin.save!

michealbuble = User.new(username: 'Micheal Buble', password: 'seedfile')
file = EzDownload.open('https://s3.amazonaws.com/crowd-sound-prod/albums/micheal+buble+-+feeling+good/buble_profile.jpeg')
michealbuble.profile_pic.attach(io: file, filename: 'buble_profile.jpeg')
michealbuble.save!

simchak = User.new(username: 'Simcha Kanter', password: 'seedfile')
file = EzDownload.open('https://s3.amazonaws.com/crowd-sound-prod/albums/simcha+kanter+Wellsprings/simchak.jpeg')
simchak.profile_pic.attach(io: file, filename: 'simchak.jpeg')
simchak.save!

zusha = User.new(username: 'Zusha', password: 'seedfile')
file = EzDownload.open('https://s3.amazonaws.com/crowd-sound-prod/albums/zusha+by+zusha/zushaprofile.jpeg')
zusha.profile_pic.attach(io: file, filename: 'zushaprofile.jpeg')
zusha.save!


# TRACKS



song = Track.new(title: 'All you got', artist_id: eigthday.id )
fille = EzDownload.open('https://s3.amazonaws.com/crowd-sound-prod/albums/8th+Day/8th+Day+-+All+You+Got/06+All+You+Got.mp3')
art = EzDownload.open('https://s3.amazonaws.com/crowd-sound-prod/albums/8th+Day/8th+Day+-+All+You+Got/all+you+got.jpg')
song.file.attach(io: fille, filename: '06+All+You+Got.mp3')
song.artwork.attach(io: art, filename: 'all+you+got.jpg')
song.save!

song = Track.new(title: 'Alef Beis' , artist_id: mIllowitz.id )
fille = EzDownload.open('https://s3.amazonaws.com/crowd-sound-prod/albums/Motty+Ilowitz+-+5778+(2018)+%40JMusicAlbums/04+-+Alef+Beis.mp3')
art = EzDownload.open('https://s3.amazonaws.com/crowd-sound-prod/albums/Motty+Ilowitz+-+5778+(2018)+%40JMusicAlbums/motty_illowitz_2018.jpeg')
song.file.attach(io: fille, filename: '04+-+Alef+Beis.mp3')
song.artwork.attach(io: art, filename: 'motty_illowitz_2018.jpeg')
song.save!

song = Track.new(title: 'Zechor Habris' , artist_id: msteinmetz.id )
fille = EzDownload.open('https://s3.amazonaws.com/crowd-sound-prod/albums/Motty+Steinmetz+-+Haneshama+Bekirbi+%40JMusic/04+Zeshor+Habris.mp3')
art = EzDownload.open('https://s3.amazonaws.com/crowd-sound-prod/albums/Motty+Steinmetz+-+Haneshama+Bekirbi+%40JMusic/motty_steinmetz_haneshama.jpeg')
song.file.attach(io: fille, filename: '04+Zeshor+Habris.mp3')
song.artwork.attach(io: art, filename: 'motty_steinmetz_haneshama.jpeg')
song.save!

song = Track.new(title: "Beethoven's 5th Symphony" , artist_id: beethoven.id )
fille = EzDownload.open('https://s3.amazonaws.com/crowd-sound-prod/albums/beethoven/beethoven.mp3')
art = EzDownload.open('https://s3.amazonaws.com/crowd-sound-prod/albums/beethoven/beethoven.jpeg')
song.file.attach(io: fille, filename: 'beethoven.mp3')
song.artwork.attach(io: art, filename: 'beethoven.jpeg')
song.save!

song = Track.new(title: "Yesh Tikvah" , artist_id: bennyfriedman.id )
fille = EzDownload.open('https://s3.amazonaws.com/crowd-sound-prod/albums/benny+friedman+Yesh+Tikvah/01+-+Yesh+Tikvah.mp3')
art = EzDownload.open('https://s3.amazonaws.com/crowd-sound-prod/albums/benny+friedman+Yesh+Tikvah/yesh-tikvah.jpeg')
song.file.attach(io: fille, filename: '01+-+Yesh+Tikvah.mp3')
song.artwork.attach(io: art, filename: 'yesh-tikvah.jpeg')
song.save!

song = Track.new(title: "Hey Love" , artist_id: leviRobin.id )
fille = EzDownload.open('https://s3.amazonaws.com/crowd-sound-prod/albums/levi+robin/Hey+Love.mp3')
art = EzDownload.open('https://s3.amazonaws.com/crowd-sound-prod/albums/levi+robin/levi+robin.jpg')
song.file.attach(io: fille, filename: 'Hey+Love.mp3')
song.artwork.attach(io: art, filename: 'levi+robin.jpg')
song.save!

song = Track.new(title: "Feeling Good" , artist_id: michealbuble.id )
fille = EzDownload.open('https://s3.amazonaws.com/crowd-sound-prod/albums/micheal+buble+-+feeling+good/Michael+Bubl%C3%A9+-+Feeling+Good+%5BOfficial+Music+Video%5D.mp3')
art = EzDownload.open('https://s3.amazonaws.com/crowd-sound-prod/albums/micheal+buble+-+feeling+good/micheal+buble.jpeg')
song.file.attach(io: fille, filename: 'Michael+Bubl%C3%A9+-+Feeling+Good+%5BOfficial+Music+Video%5D.mp3')
song.artwork.attach(io: art, filename: 'micheal+buble.jpeg')
song.save!

song = Track.new(title: "Yaale" , artist_id: simchak.id )
fille = EzDownload.open("https://s3.amazonaws.com/crowd-sound-prod/albums/simcha+kanter+Wellsprings/Ya'ale.m4a")
art = EzDownload.open('https://s3.amazonaws.com/crowd-sound-prod/albums/simcha+kanter+Wellsprings/wellsprings.jpg')
song.file.attach(io: fille, filename: "Ya'ale.m4a")
song.artwork.attach(io: art, filename: 'wellsprings.jpg')
song.save!

song = Track.new(title: "Dovber" , artist_id: zusha.id )
fille = EzDownload.open("https://s3.amazonaws.com/crowd-sound-prod/albums/zusha+by+zusha/ZUSHA++Dov+Ber++Joshua+Tree+Part+II.mp3")
art = EzDownload.open('https://s3.amazonaws.com/crowd-sound-prod/albums/zusha+by+zusha/zusha.jpeg')
song.file.attach(io: fille, filename: "ZUSHA++Dov+Ber++Joshua+Tree+Part+II.mp3")
song.artwork.attach(io: art, filename: 'zusha.jpeg')
song.save!

song = Track.new(title: "Dovber" , artist_id: zusha.id )
fille = EzDownload.open("https://s3.amazonaws.com/crowd-sound-prod/albums/zusha+shtetl/Shuva.mp3")
art = EzDownload.open('https://s3.amazonaws.com/crowd-sound-prod/albums/zusha+shtetl/zusha+kavana.jpeg')
song.file.attach(io: fille, filename: "Shuva.mp3")
song.artwork.attach(io: art, filename: 'zusha+kavana.jpeg')
song.save!

song = Track.new(title: "King" , artist_id: zusha.id )
fille = EzDownload.open("https://s3.amazonaws.com/crowd-sound-prod/albums/Zusha+-+A+Colorful+World+/04+King.mp3")
art = EzDownload.open('https://s3.amazonaws.com/crowd-sound-prod/albums/Zusha+-+A+Colorful+World+/zusha_a_colorful_world.jpeg')
song.file.attach(io: fille, filename: "04+King.mp3")
song.artwork.attach(io: art, filename: 'zusha_a_colorful_world.jpeg')
song.save!
