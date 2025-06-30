
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { imageUploadService } from "@/services/imageUploadService";

interface HeroImage {
  src: string;
  alt: string;
}

interface HeroEditFormProps {
  hero?: HeroImage;
  onSave: (data: HeroImage) => void;
  onCancel: () => void;
}

const HeroEditForm = ({ hero, onSave, onCancel }: HeroEditFormProps) => {
  const [formData, setFormData] = useState({
    src: hero?.src || "",
    alt: hero?.alt || ""
  });
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving hero image with data:', formData);
    onSave(formData);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        console.log('Starting image upload for hero...');
        const imageUrl = await imageUploadService.uploadImage(file, 'hero-images');
        console.log('Hero image uploaded successfully:', imageUrl);
        setFormData({ ...formData, src: imageUrl });
      } catch (error) {
        console.error('Failed to upload hero image:', error);
        alert('Failed to upload image. Please try again.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="alt">Image Description</Label>
        <Input
          id="alt"
          value={formData.alt}
          onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
          placeholder="e.g., Azaro Air fabric in motion"
          required
        />
      </div>

      <div>
        <Label htmlFor="hero-image">Hero Image</Label>
        <Input
          id="hero-image"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={isUploading}
        />
        {isUploading && (
          <p className="text-sm text-gray-600 mt-1">Uploading image...</p>
        )}
        {formData.src && (
          <div className="mt-2">
            <p className="text-sm text-gray-600 mb-1">Hero Preview:</p>
            <img
              src={formData.src}
              alt="Hero Preview"
              className="w-32 h-24 object-cover rounded-lg border-2 border-green-200"
            />
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Button type="submit" className="bg-black hover:bg-gray-800" disabled={isUploading}>
          Save Hero Image
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default HeroEditForm;
